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

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${ficha.nome || 'ficha'}_bluelock.png`;
    link.click();

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
    pdf.save(`${ficha.nome || 'ficha'}_bluelock.pdf`);

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
