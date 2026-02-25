import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface FichaData {
  nome: string;
  numero: string;
  classId: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  treinamentos: string[];
  notas: string;
  foto?: string;
}

interface ClassData {
  id: string;
  name: string;
  role: string;
  difficulty: string;
}

export async function exportFichaAsImage(
  ficha: FichaData,
  selectedClass: ClassData | undefined,
  elementId: string = 'ficha-final-card'
) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento de ficha não encontrado');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#0a0a0a',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    const image = canvas.toDataURL('image/png', 1.0);
    
    // Nome do arquivo limpo
    const fileName = `${(ficha.nome || 'ficha').replace(/\s+/g, '_').toLowerCase()}_bluelock_oficial.png`;

    // Detectar se é mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // No mobile, abrir em nova aba é MUITO mais confiável para o usuário salvar
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`
          <html>
            <head>
              <title>PROVA DA FICHA - BLUE LOCK RPG</title>
              <style>
                body { margin: 0; background: #050505; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; color: white; }
                img { max-width: 100%; height: auto; box-shadow: 0 0 50px rgba(0,100,255,0.3); border: 1px solid #1a1a1a; }
                .info { margin-top: 20px; text-align: center; padding: 20px; }
                .btn { background: #0066ff; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; margin-top: 10px; display: inline-block; }
              </style>
            </head>
            <body>
              <img src="${image}" />
              <div class="info">
                <p>Pressione e segure na imagem para salvar no seu celular.</p>
                <p style="font-size: 12px; color: #666;">PROVA OFICIAL DA FICHA - BLUE LOCK RPG</p>
              </div>
            </body>
          </html>
        `);
        newTab.document.close();
      } else {
        // Se o popup for bloqueado, tenta o download direto como última opção
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        link.click();
      }
    } else {
      // No PC, o download direto funciona perfeitamente
      const link = document.createElement('a');
      link.href = image;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return true;
  } catch (error) {
    console.error('Erro ao exportar como imagem:', error);
    return false;
  }
}

export async function exportFichaAsPDF(
  ficha: FichaData,
  selectedClass: ClassData | undefined,
  elementId: string = 'ficha-final-card'
) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento de ficha não encontrado');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#0a0a0a',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Para dispositivos móveis, pdf.output('bloburl') costuma ser mais confiável
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url);
    } else {
      pdf.save(`${ficha.nome || 'ficha'}_bluelock.pdf`);
    }

    return true;
  } catch (error) {
    console.error('Erro ao exportar como PDF:', error);
    return false;
  }
}

export function generateFichaHTML(
  ficha: FichaData,
  selectedClass: ClassData | undefined
): string {
  const attrValues = Object.entries(ficha.atributos)
    .map(([key, value]) => `<div class="stat-row"><span>${key}</span><span>${value}</span></div>`)
    .join('');

  const skillValues = Object.entries(ficha.pericias)
    .slice(0, 10)
    .map(([key, value]) => `<div class="skill-row"><span>${key}</span><span>${value}</span></div>`)
    .join('');

  return `
    <div class="ficha-card">
      <div class="ficha-header">
        <h1>${ficha.nome || 'Sem Nome'}</h1>
        <p class="numero">#${ficha.numero || '00'}</p>
      </div>
      
      ${ficha.foto ? `<img src="${ficha.foto}" alt="Foto do Personagem" class="ficha-photo" />` : ''}
      
      <div class="ficha-class">
        <p><strong>Classe:</strong> ${selectedClass?.name || 'Não selecionada'}</p>
        <p><strong>Papel:</strong> ${selectedClass?.role || '-'}</p>
      </div>
      
      <div class="ficha-stats">
        <h3>Atributos</h3>
        ${attrValues}
      </div>
      
      <div class="ficha-skills">
        <h3>Perícias</h3>
        ${skillValues}
      </div>
      
      <div class="ficha-folego">
        <p><strong>Fôlego:</strong> ${ficha.folego}</p>
      </div>
      
      ${ficha.notas ? `<div class="ficha-notes"><p><strong>Notas:</strong> ${ficha.notas}</p></div>` : ''}
    </div>
  `;
}
