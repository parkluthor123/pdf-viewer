pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";
const pdf = document.querySelector("#pdf-viewer");
const viewer = document.querySelector('#image-preview');
const buttonsArea = document.querySelector('.pdf-controls');
const currentPageCaptions = document.querySelector('#current-page');
const totalPagesCaptions = document.querySelector('#total-pages');
const prevButton = document.querySelector('#prev-page');
const nextButton = document.querySelector('#next-page');

const options = {
    file: null,
    numOfPages: 1,
    zoom: 1,
    currentPage: 1,
}

pdf.onchange = (e)=>{
    resetOptions();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e)=>{
        loadPDF(e.target.result);
    }
}

nextButton.onclick = ()=>{
    nextPage();
}

prevButton.onclick = ()=>{
    prevPage();
}


//FUNÇÕES DE ROTINA

function loadPDF(file)
{
    const pdfFile = pdfjsLib.getDocument(file);
    pdfFile.promise.then(pdfElement => {
        createCanvasElement();
        options.file = pdfElement;
        options.numOfPages = pdfElement.numPages
        renderPdfFile();
    })
}

//Função para renderizar o PDF
function renderPdfFile()
{
    options.file.getPage(options.currentPage).then(page => {
        const canvas = document.querySelector('#rendered-pdf');
        const ctx = canvas.getContext('2d');

        //Pega o tamanho da imagem Canvas, será setado no height e width no html do canvas (é o tamanho da imagem, não do canvas em si).
        const sizeOfPdf = page.getViewport({scale: options.zoom});
        
        canvas.height = sizeOfPdf.height; //Seta a altura da imagem
        canvas.width = sizeOfPdf.width; //Seta a largura da imagem

        //objeto que vai armazenando as configurações
        const renderContext = {
            canvasContext: ctx,
            viewport: sizeOfPdf,
        }

        //função que vai receber o objeto de configurações
        page.render(renderContext);

        //Mostra os controles
        showControls(options.currentPage, options.numOfPages);
    })
}

// Função para resetar e atualizar o PDF
function resetOptions()
{
    options.file = null;
    options.numOfPages = 1;
    options.zoom = 1;
    options.currentPage = 1;
}

//Função para criar o canvas e renderizar dentro da div <div class="image-preview">
function createCanvasElement()
{
    viewer.style.cssText = `border: 2px solid brown;`;
    const canvas = document.createElement('canvas');
    return viewer.appendChild(canvas).setAttribute('id','rendered-pdf');
}

//Função para mostrar os controles quando o PDF for carregado
function showControls(currentPage, totalOfPages){
    buttonsArea.style.display = 'flex';
    currentPageCaptions.innerHTML = currentPage;
    totalPagesCaptions.innerHTML = totalOfPages;
}

//Função para avançar para a próxima página
function nextPage()
{
    if(options.currentPage < options.numOfPages)
    {
        options.currentPage++;
        renderPdfFile();
    }
}

//Função para voltar para a página anterior
function prevPage()
{
    if(options.currentPage > 1)
    {
        options.currentPage--;
        renderPdfFile();
    }
}
