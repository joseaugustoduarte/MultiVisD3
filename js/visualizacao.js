// inicio da seção de importacao de dados

// document.body.style.zoom = "100%";

const irisPath = 'data/dataset/iris.csv'
const segmentationPath = 'data/dataset/segmentation.csv'
const concretePath = 'data/dataset/wifi.csv'
const winePath = 'data/dataset/wine.csv'

const dataLampIrisPath = 'data/dataLampIris.json'
const dataTsneIrisPath = 'data/dataTsneIris.json'

const dataLampSegPath = 'data/dataLampSeg.json'
const dataTsneSegPath = 'data/dataTsneSeg.json'

const dataLampConcretePath = 'data/dataLampWifi.json'
const dataTsneConcretePath = 'data/dataTsneWifi.json'

const dataLampWinePath = 'data/dataLampWine.json'
const dataTsneWinePath = 'data/dataTsneWine.json'

Promise.all([

    d3v5.json(dataLampIrisPath), //0
    d3v5.json(dataTsneIrisPath), //1
    d3v5.csv(irisPath), //2

    d3v5.json(dataLampSegPath), //3
    d3v5.json(dataTsneSegPath), //4
    d3v5.csv(segmentationPath), //5

    d3v5.json(dataLampConcretePath), //6
    d3v5.json(dataTsneConcretePath), //7
    d3v5.csv(concretePath), //8

    d3v5.json(dataLampWinePath), //9
    d3v5.json(dataTsneWinePath), //10
    d3v5.csv(winePath), //11

]).then((files) => {

    /* inicio da seção de variaveis globais */

// -- dimensionamento de tela e layout da aplicacao --

    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const mpHeight = (screenHeight * 62) / 100;
    const mpWidth = (screenWidth * 35) / 100;

    const distancePreservationMpHeight = (window.innerHeight * 63.5) / 100;
    const distancePreservationMpWidth = (window.innerWidth * 48) / 100;

    // const sidebarWidth = (screenWidth * 17) / 100;
    const sidebarWidth = 380;
    const margin = {top: 10, right: 20, bottom: 20, left: 10};
    const legendWidth = mpWidth - ((mpWidth * 93) / 100); //40
    const topBarHeight = ((screenWidth * 1.5) / 100);
    const labelHeight = (screenWidth * 1.3) / 100;
    const buttonWidth = (screenWidth * 15) / 100

    const treemapEaggWidth = (screenWidth-margin.right)-(mpWidth*2+legendWidth)-1;
    // const treemapEaggWidth = (screenWidth * 30) / 100;
    const treemapEaggHeight = ((mpHeight-legendWidth)/2)-labelHeight;

    const distancePreservationWidth = ((screenWidth-margin.right)-(distancePreservationMpWidth*2+legendWidth)-1)

    const sliderHeight = 100

    let viewport;
    let topBar;
    let viewboxMain;
    let topLabel;
    let projMult01Box;
    let projMult01;
    let projMultLegend;
    let projMult02Box;
    let projMult02;
    let lampEaggTreemapLabelBox;
    let lampEaggTreemapLabel;
    let lampEaggTreemapBox;
    let lampEaggTreemap;
    let treemapLegend;
    let tsneEaggTreemapLabelBox;
    let tsneEaggTreemapLabel;
    let tsneEaggTreemapBox;
    let tsneEaggTreemap;

    let fontSizeLayout = '12px'

    let textDistancePreservation
    let distancePreservation

    let sliderLamp;
    let sliderTsne;
    let tableLabel;
    let tableBox;
    let table;
    let thead;
    let tbody;
    let textProjMult01;
    let textprojMultLegend;
    let textProjMult02;
    // let textTreemapEagg;
    globalThis.selected=[];
    let removeBrush;

    let svg1ZoomX;
    let svg1ZoomY;

    let svg2ZoomX;
    let svg2ZoomY;

    let rPadrao = 5;
    const rBrush = 8;
    const corBorda = 'black';
    let circleColorBrush = "#e66101";
    let circleOpacity = 0.9;
    let treemapOpacity = '1';
    const borderTreemap = 1;
    const paddingTreemap = 0.6;
    let rectBackground = '#f7f7f7'

    const rectLegendwidth = 14;
    const rectLegendheight = (mpHeight * 50) / 100;

    /* envolve bases inicio */

    let corClassesIris;
    let corEaggIris;

    let corClassesSeg;
    let corEaggSeg;

    let corClassesConcrete;
    let corEaggConcrete;

    let corClassesWine;
    let corEaggWine;

    let minEaggLampIris=0;
    let maxEaggLampIris=0;

    let minEaggTsneIris=0;
    let maxEaggTsneIris=0;

    let minEaggLampSeg=0;
    let maxEaggLampSeg=0;

    let minEaggTsneSeg=0;
    let maxEaggTsneSeg=0;

    let minEaggLampConcrete=0;
    let maxEaggLampConcrete=0;

    let minEaggTsneConcrete=0;
    let maxEaggTsneConcrete=0;

    let minEaggLampWine=0;
    let maxEaggLampWine=0;

    let minEaggTsneWine=0;
    let maxEaggTsneWine=0;

    /* envolve bases final */

    /* distance lamp */

    let pointsFalse = [];
    let intersectionPointsFalse = [];

    let pointsTrue = [];
    let intersectionPointsTrue = [];

    let pointsMissing = [];
    let intersectionPointsMissing = [];

    let setPointsFalse = [];
    let setPointsTrue = [];
    let setPointsMissing = [];

    /* distance tsne */

    let pointsFalseTsne = []
    let intersectionPointsFalseTsne = []

    let pointsTrueTsne = []
    let intersectionPointsTrueTsne = []

    let pointsMissingTsne = []
    let intersectionPointsMissingTsne = []

    let setPointsFalseTsne = [];
    let setPointsTrueTsne = [];
    let setPointsMissingTsne = [];

    //////////////////////////////////////////

    let grad;
    let linearGradient;

    const legendDistanceColor = colorbrewer.PuOr[5]
    // const legendDistanceColor = ["#cb181d", "#fc9272","#31a354", "#9ecae1", "#3182bd"]

    let divClass
    let divError
    let divTreemap

    let colorByChangeSelectValue = "error"
    let datasetChangeselectValue = 'wine';

    sessionStorage.setItem('treemapBorderValue', 'no')

    sessionStorage.setItem('mouseoverLabelValue', 'yes')

    let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

    let sliderLampCircleOpacity
    let sliderTsneCircleOpacity
    let sliderLampTreemapOpacity
    let sliderTsneTreemapOpacity

    let sideBarLeft
    let sideBarRight

    let elementClass = []

    let infoPointLabelTotalTextDiv
    let infoPointLabelTotalValueDiv
    let infoPointLabelTotalText
    let infoPointLabelTotalValue

    globalThis.language = 'ptbr'

    /* -- fim da seção de variaveis globais -- */

    ///////////////////// IRIS /////////////////////

    xSLampIris = d3.scale.linear()
        .domain([
            d3.min(files[0].point, ( d ) => d.x),
            d3.max(files[0].point, ( d ) => d.x)
        ])
        .range( [25, mpWidth-25]);

    ySLampIris = d3.scale.linear()
        .domain([
            d3.min(files[0].point, ( d ) => d.y),
            d3.max(files[0].point, ( d ) => d.y)
        ])
        .range( [25, mpHeight-25] );

    xSTsneIris = d3.scale.linear()
        .domain([
            d3.min(files[1].point, (d) => d.x),
            d3.max(files[1].point, (d) => d.x)])
        .range([25, mpWidth - 25]);

    ySTsneIris = d3.scale.linear()
        .domain([
            d3.min(files[1].point, (d) => d.y),
            d3.max(files[1].point, (d) => d.y)
        ])
        .range([25, mpHeight - 25]);

    ///////////////////// SEG /////////////////////

    xSLampSeg = d3.scale.linear()
        .domain([
            d3.min(files[3].point, ( d ) => d.x),
            d3.max(files[3].point, ( d ) => d.x)
        ])
        .range( [25, mpWidth-25]);

    ySLampSeg = d3.scale.linear()
        .domain([
            d3.min(files[3].point, ( d ) => d.y),
            d3.max(files[3].point, ( d ) => d.y)
        ])
        .range( [25, mpHeight-25] );

    xSTsneSeg = d3.scale.linear()
        .domain([
            d3.min(files[4].point, (d) => d.x),
            d3.max(files[4].point, (d) => d.x)])
        .range([25, mpWidth - 25]);

    ySTsneSeg = d3.scale.linear()
        .domain([
            d3.min(files[4].point, (d) => d.y),
            d3.max(files[4].point, (d) => d.y)
        ])
        .range([25, mpHeight - 25]);

    ///////////////////// CONCRETE /////////////////////

    xSLampConcrete = d3.scale.linear()
        .domain([
            d3.min(files[6].point, ( d ) => d.x),
            d3.max(files[6].point, ( d ) => d.x)
        ])
        .range( [25, mpWidth-25]);

    ySLampConcrete = d3.scale.linear()
        .domain([
            d3.min(files[6].point, ( d ) => d.y),
            d3.max(files[6].point, ( d ) => d.y)
        ])
        .range( [25, mpHeight-25] );

    xSTsneConcrete = d3.scale.linear()
        .domain([
            d3.min(files[7].point, (d) => d.x),
            d3.max(files[7].point, (d) => d.x)])
        .range([25, mpWidth - 25]);

    ySTsneConcrete = d3.scale.linear()
        .domain([
            d3.min(files[7].point, (d) => d.y),
            d3.max(files[7].point, (d) => d.y)
        ])
        .range([25, mpHeight - 25]);


    ///////////////////// WINE /////////////////////

    xSLampWine = d3.scale.linear()
        .domain([
            d3.min(files[9].point, ( d ) => d.x),
            d3.max(files[9].point, ( d ) => d.x)
        ])
        .range( [25, mpWidth-25]);

    ySLampWine = d3.scale.linear()
        .domain([
            d3.min(files[9].point, ( d ) => d.y),
            d3.max(files[9].point, ( d ) => d.y)
        ])
        .range( [25, mpHeight-25] );

    xSTsneWine = d3.scale.linear()
        .domain([
            d3.min(files[10].point, (d) => d.x),
            d3.max(files[10].point, (d) => d.x)])
        .range([25, mpWidth - 25]);

    ySTsneWine = d3.scale.linear()
        .domain([
            d3.min(files[10].point, (d) => d.y),
            d3.max(files[10].point, (d) => d.y)
        ])
        .range([25, mpHeight - 25]);

    ///////////////////////////escalas DistancePreservation////////////////////////////////

    ///////////////////// IRIS /////////////////////

    xSLampIrisDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[0].point, ( d ) => d.x),
            d3.max(files[0].point, ( d ) => d.x)
        ])
        .range( [25, distancePreservationMpWidth-25]);

    ySLampIrisDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[0].point, ( d ) => d.y),
            d3.max(files[0].point, ( d ) => d.y)
        ])
        .range( [25, distancePreservationMpHeight-25] );

    xSTsneIrisDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[1].point, (d) => d.x),
            d3.max(files[1].point, (d) => d.x)])
        .range([25, distancePreservationMpWidth - 25]);

    ySTsneIrisDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[1].point, (d) => d.y),
            d3.max(files[1].point, (d) => d.y)
        ])
        .range([25, distancePreservationMpHeight - 25]);

    ///////////////////// SEG /////////////////////

    xSLampSegDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[3].point, ( d ) => d.x),
            d3.max(files[3].point, ( d ) => d.x)
        ])
        .range( [25, distancePreservationMpWidth-25]);

    ySLampSegDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[3].point, ( d ) => d.y),
            d3.max(files[3].point, ( d ) => d.y)
        ])
        .range( [25, distancePreservationMpHeight-25] );

    xSTsneSegDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[4].point, (d) => d.x),
            d3.max(files[4].point, (d) => d.x)])
        .range([25, distancePreservationMpWidth - 25]);

    ySTsneSegDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[4].point, (d) => d.y),
            d3.max(files[4].point, (d) => d.y)
        ])
        .range([25, distancePreservationMpHeight - 25]);

    ///////////////////// CONCRETE /////////////////////

    xSLampConcreteDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[6].point, ( d ) => d.x),
            d3.max(files[6].point, ( d ) => d.x)
        ])
        .range( [25, distancePreservationMpWidth-25]);

    ySLampConcreteDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[6].point, ( d ) => d.y),
            d3.max(files[6].point, ( d ) => d.y)
        ])
        .range( [25, distancePreservationMpHeight-25] );

    xSTsneConcreteDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[7].point, (d) => d.x),
            d3.max(files[7].point, (d) => d.x)])
        .range([25, distancePreservationMpWidth - 25]);

    ySTsneConcreteDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[7].point, (d) => d.y),
            d3.max(files[7].point, (d) => d.y)
        ])
        .range([25, distancePreservationMpHeight - 25]);

    ///////////////////// WINE /////////////////////

    xSLampWineDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[9].point, ( d ) => d.x),
            d3.max(files[9].point, ( d ) => d.x)
        ])
        .range( [25, distancePreservationMpWidth-25]);

    ySLampWineDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[9].point, ( d ) => d.y),
            d3.max(files[9].point, ( d ) => d.y)
        ])
        .range( [25, distancePreservationMpHeight-25] );

    xSTsneWineDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[10].point, (d) => d.x),
            d3.max(files[10].point, (d) => d.x)])
        .range([25, distancePreservationMpWidth - 25]);

    ySTsneWineDistancePreservation = d3.scale.linear()
        .domain([
            d3.min(files[10].point, (d) => d.y),
            d3.max(files[10].point, (d) => d.y)
        ])
        .range([25, distancePreservationMpHeight - 25]);

    ////////////////////////////////colorScaleDistance/////////////////////////////

    let colorScaleDistance = d3v4.scaleOrdinal()
        .domain([-1,0,1])
        .range(colorbrewer.PuOr[3]);
    // .range(["#cb181d","#31a354","#2171b5"]);

    function sideBarLeft_(){

        let divContentErrorAndClass_en = [
            {id: 'languageText', class: 'languageText', altura: 20, largura: 250, label: 'Language'},
            {id: 'language', class: 'language', altura: 20, largura: 250},

            {id: 'datasetText', class: 'datasetText', altura: 20, largura: 250, label: 'Dataset'},
            {id: 'dataset', class: 'dataset', altura: 20, largura: 250},
            {id: 'datasetInfo', class: 'datasetInfo', altura: 20, largura: 250},

            {id: 'colorByText', class: 'colorByText', altura: 20, largura: 250, label: 'View'},
            {id: 'colorBy', class: 'colorBy', altura: 20, largura: 250},

            {id: 'sizeCircleText', class: 'sizeCircleText', altura: 20, largura: 250, label: 'Circle Size'},
            {id: 'sizeCircle', class: 'sizeCircle', altura: 13, largura: 250},

            {id: 'backgroundText', class: 'backgroundText', altura: 20, largura: 250, label: 'Background Color'},
            {id: 'background', class: 'background', altura: 13, largura: 250},

            {id: 'transparencyCircleText', class: 'transparencyCircleText', altura: 20, largura: 250, label: 'Circle Transparency'},
            {id: 'transparencyCircle', class: 'transparencyCircle', altura: 13, largura: 250},

            {id: 'treemapBorderText', class: 'treemapBorderText', altura: 20, largura: 250, label: 'Treemap Border'},
            {id: 'treemapBorder', class: 'treemapBorder', altura: 20, largura: 170},

            {id: 'mouseoverLabelText', class: 'mouseoverLabelText', altura: 20, largura: 250, label: 'Mouseover Label'},
            {id: 'mouseoverLabel', class: 'mouseoverLabel', altura: 20, largura: 170},

            {id: 'mouseoverColorText', class: 'mouseoverColorText', altura: 20, largura: 250, label: 'Highlight Color'},
            {id: 'mouseoverColor', class: 'mouseoverColor', altura: 20, largura: 170},

            {id: 'colorPaletteText', class: 'colorPaletteText', altura: 20, largura: 250, label: 'Color Palette'},
            {id: 'dropdown', class: 'dropdown', altura: 20, largura: 250}
        ]

        let divContentErrorAndClass_ptbr = [
            {id: 'languageText', class: 'languageText', altura: 20, largura: 250, label: 'Idioma'},
            {id: 'language', class: 'language', altura: 20, largura: 250},

            {id: 'datasetText', class: 'datasetText', altura: 20, largura: 250, label: 'Base de Dados'},
            {id: 'dataset', class: 'dataset', altura: 20, largura: 250},
            {id: 'datasetInfo', class: 'datasetInfo', altura: 20, largura: 250},

            {id: 'colorByText', class: 'colorByText', altura: 20, largura: 250, label: 'Visão'},
            {id: 'colorBy', class: 'colorBy', altura: 20, largura: 250},

            {id: 'sizeCircleText', class: 'sizeCircleText', altura: 20, largura: 250, label: 'Tamanho do Círculo'},
            {id: 'sizeCircle', class: 'sizeCircle', altura: 13, largura: 250},

            {id: 'backgroundText', class: 'backgroundText', altura: 20, largura: 250, label: 'Cor de Fundo'},
            {id: 'background', class: 'background', altura: 13, largura: 250},

            {id: 'transparencyCircleText', class: 'transparencyCircleText', altura: 20, largura: 250, label: 'Transparência do Círculo'},
            {id: 'transparencyCircle', class: 'transparencyCircle', altura: 13, largura: 250},

            {id: 'treemapBorderText', class: 'treemapBorderText', altura: 20, largura: 250, label: 'Linha de Borda do Mapa de Árvore'},
            {id: 'treemapBorder', class: 'treemapBorder', altura: 20, largura: 170},

            {id: 'mouseoverLabelText', class: 'mouseoverLabelText', altura: 20, largura: 250, label: 'Rótulo ao Passar o Mouse'},
            {id: 'mouseoverLabel', class: 'mouseoverLabel', altura: 20, largura: 170},

            {id: 'mouseoverColorText', class: 'mouseoverColorText', altura: 20, largura: 250, label: 'Cor do Realce ao Passar o Mouse'},
            {id: 'mouseoverColor', class: 'mouseoverColor', altura: 20, largura: 170},

            {id: 'colorPaletteText', class: 'colorPaletteText', altura: 20, largura: 250, label: 'Paleta de Cores'},
            {id: 'dropdown', class: 'dropdown', altura: 20, largura: 250}
        ]

        let divContentDistance_en = [
            {id: 'languageText', class: 'languageText', altura: 20, largura: 250, label: 'Language'},
            {id: 'language', class: 'language', altura: 20, largura: 250},

            {id: 'datasetText', class: 'datasetText', altura: 20, largura: 250, label: 'Dataset'},
            {id: 'dataset', class: 'dataset', altura: 20, largura: 250},
            {id: 'datasetInfo', class: 'datasetInfo', altura: 20, largura: 250},

            {id: 'colorByText', class: 'colorByText', altura: 20, largura: 250, label: 'View'},
            {id: 'colorBy', class: 'colorBy', altura: 20, largura: 250},

            {id: 'sizeCircleText', class: 'sizeCircleText', altura: 20, largura: 250, label: 'Circle Size'},
            {id: 'sizeCircle', class: 'sizeCircle', altura: 13, largura: 250},

            {id: 'backgroundText', class: 'backgroundText', altura: 20, largura: 250, label: 'Background Color'},
            {id: 'background', class: 'background', altura: 13, largura: 250},

            {id: 'transparencyCircleText', class: 'transparencyCircleText', altura: 20, largura: 250, label: 'Circle Transparency'},
            {id: 'transparencyCircle', class: 'transparencyCircle', altura: 13, largura: 250},

            {id: 'mouseoverLabelText', class: 'mouseoverLabelText', altura: 20, largura: 250, label: 'Rótulo ao Passar o Mouse'},
            {id: 'mouseoverLabel', class: 'mouseoverLabel', altura: 20, largura: 170},

            {id: 'mouseoverColorText', class: 'mouseoverColorText', altura: 20, largura: 250, label: 'Mouseover Color'},
            {id: 'mouseoverColor', class: 'mouseoverColor', altura: 20, largura: 170},

            {id: 'neighborsText', class: 'neighborsText', altura: 20, largura: 250, label: 'Neighbors'},
            {id: 'neighbors', class: 'neighbors', altura: 20, largura: 250}
        ]

        let divContentDistance_ptbr = [
            {id: 'languageText', class: 'languageText', altura: 20, largura: 250, label: 'Idioma'},
            {id: 'language', class: 'language', altura: 20, largura: 250},

            {id: 'datasetText', class: 'datasetText', altura: 20, largura: 250, label: 'Base de Dados'},
            {id: 'dataset', class: 'dataset', altura: 20, largura: 250},
            {id: 'datasetInfo', class: 'datasetInfo', altura: 20, largura: 250},

            {id: 'colorByText', class: 'colorByText', altura: 20, largura: 250, label: 'Visão'},
            {id: 'colorBy', class: 'colorBy', altura: 20, largura: 250},

            {id: 'sizeCircleText', class: 'sizeCircleText', altura: 20, largura: 250, label: 'Tamanho do Círculo'},
            {id: 'sizeCircle', class: 'sizeCircle', altura: 13, largura: 250},

            {id: 'backgroundText', class: 'backgroundText', altura: 20, largura: 250, label: 'Cor de Fundo'},
            {id: 'background', class: 'background', altura: 13, largura: 250},

            {id: 'transparencyCircleText', class: 'transparencyCircleText', altura: 20, largura: 250, label: 'Transparência do Círculo'},
            {id: 'transparencyCircle', class: 'transparencyCircle', altura: 13, largura: 250},

            {id: 'mouseoverLabelText', class: 'mouseoverLabelText', altura: 20, largura: 250, label: 'Rótulo ao Passar o Mouse'},
            {id: 'mouseoverLabel', class: 'mouseoverLabel', altura: 20, largura: 170},

            {id: 'mouseoverColorText', class: 'mouseoverColorText', altura: 20, largura: 250, label: 'Cor do Realce ao Passar o Mouse'},
            {id: 'mouseoverColor', class: 'mouseoverColor', altura: 20, largura: 170},

            {id: 'neighborsText', class: 'neighborsText', altura: 20, largura: 250, label: 'Vizinhos'},
            {id: 'neighbors', class: 'neighbors', altura: 20, largura: 250}
        ]

        sideBarLeft = d3.select("body")
            .append('div')
            .attr("id", "sideBarLeft")
            .attr('class', 'sideBarLeft')
            .style("height", (screenHeight-margin.top-margin.bottom)+'px')
            .style("width", (sidebarWidth-margin.right)+'px')
            // .style('font-size', fontSizeLayout)

        sideBarLeft.transition()
            .duration(300)
            .style("visibility", "hidden")
            .style("opacity", '0')
            .style('background-color', '#fff')
            .style('position', 'absolute')
            .style('top','12px')

        let sideBarButtonClose = sideBarLeft
            .append("button")
            .attr('type', 'button')
            .attr("class", "leftButton")
            .attr("id", "sideBarButtonLeftClose")
            .attr("height", topBarHeight)
            .style("width", '80px')
            .text(() => {
                if(language === 'en'){
                    return 'Close X'
                } else if (language === 'ptbr') {
                    return 'Fechar X'
                }
            })
            .style('font-size', fontSizeLayout)
            .on('click', () => {
                sideBarLeft.transition()
                    .duration(800)
                    .style("visibility", "invisible")
                    .style("opacity", '0')
                    .style('width', '0px')
            })

        let divsDropbox = sideBarLeft
            .selectAll('div')
            .data(() => {
                if(language === 'en'){
                    if (colorByChangeSelectValue === 'distance'){
                        return divContentDistance_en
                    } else {
                        return divContentErrorAndClass_en
                    }
                } else if (language === 'ptbr'){
                    if (colorByChangeSelectValue === 'distance'){
                        return divContentDistance_ptbr
                    } else {
                        return divContentErrorAndClass_ptbr
                    }
                }
            }).enter()
            .append('div')
            .attr('id', (d) => d.id)
            .attr('class', (d) => d.class)
            .style("height", (d) => d.altura+'px')
            .style("width", (d) => d.largura+'px')
            .append("text")
            .text((d) => d.label)
            .style('font-size', '16px')
    }

    function sideBarRight_(){

        let sidebarRightText_ptbr = [
            {id: 'zoomSelecao', text: 'Ativar Zoom e Seleção'},
            {id: 'zoomSelecaoText', text: 'Para ativar as interações Zoom e Seleção nas Projeções Multidimensionais é necessário clicar uma vez com o botão direito e uma vez com o botão esquerdo do mouse dentro do espaço da Projeção Multidimensional.'},
            {id: 'zoom', text: "Zoom"},
            {id: 'zoomText', text: "Após ativado, o Zoom pode ser utilizado nas Projeções Multidimensionais de duas formas: 1) 'Duplo Click' com o botão esquerdo do mouse dentro das Projeção Multidimensional para aumentar o nível de Zoom; 2) Rolando o botão Scroll do mouse dentro da Projeção Multidimensional para aumentar ou diminuir o nível de Zoom."},
            {id: 'selecao', text: "Seleção por Click"},
            {id: 'selecaoText', text: "Para selecionar elementos individualmente nas Projeções Multidimensionais ou nos Treemaps 'Click' os círculos das Projeções e/ou os retângulos dos Treemaps"},
            {id: 'selecaoMultipla', text: "Seleção Múltipla"},
            {id: 'selecaoMultiplaText', text: "Para selecionar vários itens simultâneamente nas Projeções Multidimensionais 'Click e Arraste' com o BOTÃO DIREITO do mouse livremente sobre uma área das Projeções e selecione os círculos do perímetro. Para remover a mancha cinza da seleção criada com botão DIREITO do mouse, basta clicar UMA vez com o botão DIREITO dentro de qualquer Projeção."},
            {id: 'limparSelecao', text: "Limpar Seleção"},
            {id: 'limparSelecaoText', text: "Para remover: o highlight dos elementos selecionados, a visão tabular e o filtro do slider, basta clicar UMA vez dentro de uma Projeção Multidimensional com o botão ESQUERDO do mouse."},
            {id: 'abbreviation', text: "Abreviação"},
            {id: 'abbreviationText', text: "- IE: Intervalo de Erro"}
        ]

        let sidebarRightText_en = [
            {id: 'zoomSelecao', text: 'Enable Zoom and Selection'},
            {id: 'zoomSelecaoText', text: 'To activate the Zoom and Selection interactions in Multidimensional Projections, it is necessary to click once with the right button and once with the left button of the mouse inside the Multidimensional Projection space.'},
            {id: 'zoom', text: "Zoom"},
            {id: 'zoomText', text: "Once activated, Zoom can be used in Multidimensional Projections in two ways: 1) 'Double Click' with the left mouse button inside the Multidimensional Projection to increase the Zoom level; 2) Rolling the mouse's Scroll button inside the Multidimensional Projection to increase or decrease the Zoom level."},
            {id: 'selecao', text: "Selection by Click"},
            {id: 'selecaoText', text: "To select elements individually in Multidimensional Projections or Treemaps 'Click' the Projection circles and/or the Treemap rectangles."},
            {id: 'selecaoMultipla', text: "Multiple Selection"},
            {id: 'selecaoMultiplaText', text: "To select several items simultaneously in the Multidimensional Projections 'Click and Drag' with the RIGHT BUTTON of the mouse freely over an area of ​​the Projections and select the perimeter circles. To remove the gray spot from the selection created with the RIGHT mouse button, simply click ONCE with the RIGHT button inside any Projection."},
            {id: 'limparSelecao', text: "clear selection"},
            {id: 'limparSelecaoText', text: "To remove: the highlight of selected elements, the tabular view and the slider filter, just click ONCE inside a Multidimensional Projection with the LEFT mouse button."},
            {id: 'abbreviation', text: "Abbreviation"},
            {id: 'abbreviationText', text: "- ER: Error Range"}
        ]

        sideBarRight = d3.select("body")
            .append('div')
            .attr("id", "sideBarRight")
            .attr('class', 'sideBarRight')
            .style("height", (screenHeight-margin.top-margin.bottom)+'px')
            .style("width", (sidebarWidth-margin.right)+'px')

        sideBarRight.transition()
            .duration(300)
            .style("visibility", "hidden")
            .style("opacity", '0')
            .style('background-color', '#fff')
            .style('position', 'absolute')
            .style('top','12px')

        let sidebarRightButtonClose = sideBarRight
            .append("button")
            .attr('type', 'button')
            .attr("class", "rightButton")
            .attr('id', "sidebarButtonRightClose")
            .attr("height", topBarHeight)
            .style("width", '80px')
            .text(() => {
                if(language === 'en'){
                    return 'Close X'
                } else if (language === 'ptbr') {
                    return 'Fechar X'
                }
            })
            .style('font-size', fontSizeLayout)
            .on('click', () => {
                sideBarRight.transition()
                    .duration(800)
                    .style("visibility", "invisible")
                    .style("opacity", '0')
                    .style('width', '0px')
            })

        let pInfo = sideBarRight
            .selectAll('p')
            .data(() => {
                if(language === 'en'){
                    return sidebarRightText_en
                } else if (language === 'ptbr') {
                    return sidebarRightText_ptbr
                }
            }).enter()
            .append('p')
            .attr('id', (d) => d.id)
            .append("text")
            .text((d) => d.text)
    }

    document.addEventListener("keydown", function (btn){
        if(btn.code == "Escape"){
            const btn_ = document.querySelector("#sideBarButtonLeftClose")
            btn_.click()
        }
    })

    document.addEventListener("keydown", function (btn){
        if(btn.code == "Escape"){
            const btn_ = document.querySelector("#sidebarButtonRightClose")
            btn_.click()
        }
    })

    function sideBar_(){
        topBar = d3.select('#viewport')
            .append('g')
            .attr('id', 'topBar')
            .attr("height", topBarHeight)
            .attr("width", screenWidth-margin.right)

        let topBarHtml = topBar
            .append("foreignObject")
            .attr("height", (topBarHeight*1.5))
            .attr("width", screenWidth-margin.right)
            .append("xhtml:body")
            .attr("id", "topBarHtml")

        let topBarHtmlContainer = topBarHtml
            .append("div")
            .attr("id", "topBarHtmlContainer")
            .attr("height", '100%')
            .attr("width", '100%')
            .style("display", "flex")
            .style("flex-direction", "row")
            .style("justify-content", "space-between")
            .style("align-items", "center")

        let leftButtonBox = topBarHtmlContainer
            .append("div")
            .attr("id", "leftButtonBox")
            .attr("width", '25%')

        let leftButton = leftButtonBox
            .append("button")
            .attr('type', 'button')
            .attr("class", "leftButton")
            .attr("height", topBarHeight)
            .style("width", '80px')
            .text('Menu')
            .style('font-size', fontSizeLayout)
            .on('click', () => {
                    sideBarLeft
                    .transition()
                    .duration(600)
                    .style("visibility", "visible")
                    .style("opacity", '1')
                    .style('width', (sidebarWidth-margin.right)+'px')
                    .style('display', 'block')
            })

        // centerTitle

        let centerTitle = topBarHtmlContainer
            .append("div")
            .attr("id", "centerTitle")
            .attr("width", '50%')
            .text('MultiVisD3: Projection Error Analiser')
            .style('font-size', '15px')
            .style('font-family', 'Helvetica Neue, Helvetica, Arial, sans-serif')
            .style('font-weight', 'bold')
            .style('text-align',"center")

        let rightButtonBox = topBarHtmlContainer
            .append("div")
            .attr("id", "rightButtonBox")
            .attr("width", '25%')

        let rightButton = rightButtonBox
            .append("button")
            .attr('type', 'button')
            .attr("class", "rightButton")
            .attr("height", topBarHeight)
            .style("width", '80px')
            .text(() => {
                if(language === 'en'){
                    return 'Help'
                } else if (language === 'ptbr') {
                    return 'Ajuda'
                }
            })
            .style('font-size', fontSizeLayout)
            .on('click', () => {
                sideBarRight
                    .transition()
                    .duration(600)
                    .style("visibility", "visible")
                    .style("opacity", '1')
                    .style('width', (sidebarWidth-margin.right)+'px')
                    .style('display', 'block')
            })
    }

    linkedViewsError();

    function linkedViewsError() {

        d3.select(".vis").selectAll("*").remove()

        viewport = d3.select(".vis")
            .append("svg")
            .attr('id', 'viewport')
            .attr("height", labelHeight*4+mpHeight+legendWidth)
            .attr("width", screenWidth-(margin.right))
            .on('contextmenu', () => {
                d3.event.preventDefault(); // desabilitando a função menu de contexto do botão direito do mouse nas projeções
            });

        // viewport.append('rect')
        //     .attr("height", screenHeight-margin.bottom)
        //     .attr("width", screenWidth-margin.right)
        //     .style("fill", "#fafafa")
        //     .style("stroke", "gray")
        //     .style("stroke-width", 0.5)

        /*--------------------------------------------*/

        sideBarLeft_()

        sideBarRight_()

        sideBar_()

        /*--------------------------------------------*/

        viewboxMain = d3.select('#viewport')
            .append('g')
            .attr("transform", "translate( 0 " + (topBarHeight*1.5) + ")")
            // .append('svg')
            .attr('id', 'viewboxMain')
            .attr("height", screenHeight-margin.bottom-topBarHeight)
            .attr("width", screenWidth-margin.right)

        // viewboxMain.append('rect')
        //     .attr("height", screenHeight-margin.bottom-topBarHeight)
        //     .attr("width", screenWidth-margin.right)
        //     .style("fill", "transparent")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        topLabel = viewboxMain
            .append('g')
            .attr('id', 'topLabel')
            .attr("height", labelHeight)
            .attr("width", screenWidth-margin.right)

        // topLabel.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", screenWidth-margin.right)
        //     .style("fill", "transparent")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        textProjMult01 = d3.select('#topLabel')
            .append('g')
            .attr('id', 'textProjMult01')
            .attr("height", labelHeight)
            .attr("width", mpWidth)

        // textProjMult01.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", mpWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        textProjMult01.append("text")
            .attr('class', 'labelsTop')
            .attr("x", (mpWidth/2))
            .attr("y", (labelHeight/2))
            .text("Local Affine Multidimensional Projection - LAMP")
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        textprojMultLegend = d3.select('#topLabel')
            .append('g')
            .attr('id', 'textprojMultLegend')
            .attr("transform", "translate(" + mpWidth + " 0)")
            .attr("height", labelHeight)
            .attr("width", legendWidth)

        // textprojMultLegend.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", legendWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        textProjMult02 = d3.select('#topLabel')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth) + " 0)")
            .append('svg')
            .attr('id', 'textProjMult02')
            .attr("height", labelHeight)
            .attr("width", mpWidth)

        // textProjMult02.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", mpWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        textProjMult02 = d3.select('#textProjMult02')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (mpWidth/2))
            .attr("y", (labelHeight/2))
            .text("t-Distributed Stochastic Neighbor Embedding - tSNE")
            // .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        lampEaggTreemapLabelBox = d3.select('#topLabel')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth+mpWidth) + " 0)")
            .append('svg')
            .attr('id', 'lampEaggTreemapLabelBox')
            .attr("height", labelHeight)
            .attr("width", treemapEaggWidth)

        // lampEaggTreemapLabelBox.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        lampEaggTreemapLabel = d3.select('#lampEaggTreemapLabelBox')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (treemapEaggWidth/2))
            .attr("y", (labelHeight/2))
            .text(() => {
                if(language === 'en'){
                    return 'Normalized Aggregated Error | LAMP'
                } else if (language === 'ptbr') {
                    return 'Erro Agregado Normalizado | LAMP'
                }
            })
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        projMult01Box = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate( 0 " + (labelHeight) + ")")

        projMult01 = projMult01Box
            .append('svg')
            .attr('id', 'projMult01')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .on('mousedown', () => {
                if (d3.event.button === 0) {
                    projMult01.call(dragSvg1); // habilitando o brush livre no botão direito do mouse
                } else if (d3.event.button === 2) {
                    projMult01.call(zoomSvg1); // habilitando o zoom no botão esquerdo do mouse
                }
            })

        projMult01.append('rect')
            .attr('id', 'projMult01Rect')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .style("fill", rectBackground)
            .style("stroke", "gray")
            .style("stroke-width", 0.5)

        /*--------------------------------------------*/

        projMultLegend = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'projMultLegend')
            .attr("transform", "translate(" + mpWidth + " " + labelHeight + ")")
            .attr("height", mpHeight)
            .attr("width", legendWidth)

        /*--------------------------------------------*/

        projMult02Box = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth) + " " + labelHeight + ")")

        projMult02 = projMult02Box
            .append('svg')
            .attr('id', 'projMult02')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .on('mousedown', () => {
                if (d3.event.button === 0) {
                    projMult02.call(dragSvg2); // habilitando o brush livre no botão direito do mouse
                } else if (d3.event.button === 2) {
                    projMult02.call(zoomSvg2); // habilitando o zoom no botão esquerdo do mouse
                }
            })

        projMult02.append('rect')
            .attr('id', 'projMult02Rect')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .style("fill", rectBackground)
            .style("stroke", "gray")
            .style("stroke-width", 0.5)

        /*--------------------------------------------*/

        lampEaggTreemapBox = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'lampEaggTreemapBox')
            .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + labelHeight + ")")

        lampEaggTreemap = lampEaggTreemapBox
            .append('svg')
            .attr('id', 'lampEaggTreemap')
            .attr("height", treemapEaggHeight)
            .attr("width", treemapEaggWidth)

        // lampEaggTreemap.append('rect')
        //     .attr("height", treemapEaggHeight)
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        treemapLegend = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'treemapLegend')
            .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + (treemapEaggHeight+labelHeight*1.1) + ")")
            .attr("height", (labelHeight*1.5))
            .attr("width", treemapEaggWidth)

        // treemapLegend.append('rect')
        //     .attr("height", (labelHeight*1.5))
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        tsneEaggTreemapLabelBox = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + (treemapEaggHeight+labelHeight*3.9) + ")")
            // .append('svg')
            .attr('id', 'tsneEaggTreemapLabelBox')
            .attr("height", labelHeight)
            .attr("width", treemapEaggWidth)

        // tsneEaggTreemapLabel.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "green")
        //     .style("stroke-width", '1')

        tsneEaggTreemapLabel = d3.select('#tsneEaggTreemapLabelBox')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (treemapEaggWidth/2))
            .attr("y", (labelHeight/2))
            .text(() => {
                if(language === 'en'){
                    return 'Normalized Aggregated Error | tSNE'
                } else if (language === 'ptbr') {
                    return 'Erro Agregado Normalizado | tSNE'
                }
            })
            // .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        tsneEaggTreemapBox = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'tsneEaggTreemapBox')
            .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + (treemapEaggHeight+labelHeight*4.9) + ")")

        tsneEaggTreemap = tsneEaggTreemapBox
            .append('svg')
            .attr('id', 'tsneEaggTreemap')
            .attr("height", treemapEaggHeight)
            .attr("width", treemapEaggWidth)

        // tsneEaggTreemap.append('rect')
        //     .attr("height", treemapEaggHeight)
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "gray")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        sliderLampBox = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(0 " + (labelHeight+mpHeight) + ")")
            .append('svg')
            .attr('id', 'sliderLampBox')
            .attr("height", sliderHeight)
            .attr("width", mpWidth)

        sliderLampHtml = sliderLampBox
            .append("foreignObject")
            .attr("height", sliderHeight)
            .attr("width", mpWidth)
            .append("xhtml:body")
            .attr("id", "sliderLampHtml")

        // sliderLamp = sliderLampHtml
        //     .append("div")
        //     .attr("id", "sliderLamp")
        //     .style("height", (18)+'px')
        //     .style("width", (mpWidth-50) +'px')
        //     .style('left', "15px")

        /*--------------------------------------------*/

        sliderTsneBox = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth) + " " + (labelHeight+mpHeight) + ")")
            .append('svg')
            .attr('id', 'sliderTsneBox')
            .attr("height", sliderHeight)
            .attr("width", mpWidth)

        sliderTsneHtml = sliderTsneBox
            .append("foreignObject")
            .attr("height", sliderHeight)
            .attr("width", mpWidth)
            .append("xhtml:body")
            .attr("id", "sliderTsneHtml")

        // sliderTsne = sliderTsneHtml
        //     .append("div")
        //     .attr("id", "sliderTsne")
        //     .style("height", (18)+'px')
        //     .style("width", (mpWidth-50) +'px')
        //     .style('left', "15px")

        /*--------------------------------------------*/

        let infoPointsBox = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth+mpWidth) + " " + (labelHeight+mpHeight) + ")")
            .append('svg')
            .attr('id', 'infoPointsBox')
            .attr("height", sliderHeight)
            .attr("width", mpWidth)

        let infoPointsHtml = infoPointsBox
            .append("foreignObject")
            .attr("height", sliderHeight)
            .attr("width", mpWidth)
            .append("xhtml:body")
            .attr("id", "infoPointsHtml")

        let infoPointsDiv = infoPointsHtml
            .append("div")
            .attr("id", "infoPointsDiv")
            .style("display","flex")

        infoPointLabelTotalTextDiv = infoPointsDiv
            .append("div")
            .attr("id", "infoPointLabelTotalTextDiv")

        infoPointLabelTotalValueDiv = infoPointsDiv
            .append("div")
            .attr("id", "infoPointLabelTotalValueDiv")

        //% da base

        /*--------------------------------------------*/

        tableLabel = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'tableLabel')
            .attr("transform", "translate( 0 " + (labelHeight+(labelHeight/2)+mpHeight+legendWidth) + ")")
            // .append('svg')
            .attr("height", labelHeight)
            .attr("width", screenWidth-margin.right)

        tableLabel = d3.select('#tableLabel')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (screenWidth-margin.right)/2)
            .attr("y", labelHeight/2)
            .text(() => {
                if(language === 'en'){
                    return 'Table View'
                } else if (language === 'ptbr') {
                    return 'Visão Tabular'
                }
            })
            // .style('font-size', '15px')
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        // tableBox = d3.select('body')
        //     .append('div')
        //     .attr('id', 'tableBox')
        //     // .attr("height", tableHeight)
        //     .style("width", screenWidth)

        divError = d3.select("body")
            .append("div")
            .attr("class", "tooltipError")
            .style("opacity", '0')
            .style("left", "450px")
            .style("top", "15px")

        divTreemap = d3.select("body")
            .append("div")
            .attr("class", "tooltipTreemap")
            .style("opacity", '0')
            .style("left", "500px")
            .style("top", "15px")

    }

    function linkedViewsClass() {

        treemapBorderValue = 'yes'

        viewport = d3.select(".vis")
            .append("svg")
            .attr('id', 'viewport')
            .attr("height", labelHeight*4+mpHeight+legendWidth)
            .attr("width", screenWidth-margin.right)
            .on('contextmenu', () => {
                d3.event.preventDefault(); // desabilitando a função menu de contexto do botão direito do mouse nas projeções
            });

        // viewport.append('rect')
        //     .attr("height", screenHeight-margin.bottom)
        //     .attr("width", screenWidth-margin.right)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", 0.5)

        /*--------------------------------------------*/

        sideBarLeft_()

        sideBarRight_()

        sideBar_()

        /*--------------------------------------------*/

        viewboxMain = d3.select('#viewport')
            .append('g')
            .attr("transform", "translate( 0 " + (topBarHeight*1.5) + ")")
            // .append('svg')
            .attr('id', 'viewboxMain')
            .attr("height", screenHeight-margin.bottom-topBarHeight)
            .attr("width", screenWidth-margin.right)

        // viewboxMain.append('rect')
        //     .attr("height", screenHeight-margin.bottom-topBarHeight)
        //     .attr("width", screenWidth-margin.right)
        //     .style("fill", "transparent")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        topLabel = viewboxMain
            .append('g')
            .attr('id', 'topLabel')
            .attr("height", labelHeight)
            .attr("width", screenWidth-margin.right)

        // topLabel.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", screenWidth-margin.right)
        //     .style("fill", "transparent")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        textProjMult01 = d3.select('#topLabel')
            .append('g')
            .attr('id', 'textProjMult01')
            .attr("height", labelHeight)
            .attr("width", mpWidth)

        // textProjMult01.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", mpWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        textProjMult01.append("text")
            .attr('class', 'labelsTop')
            .attr("x", (mpWidth/2))
            .attr("y", (labelHeight/2))
            .text("Local Affine Multidimensional Projection - LAMP")
            // .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        textprojMultLegend = d3.select('#topLabel')
            .append('g')
            .attr('id', 'textprojMultLegend')
            .attr("transform", "translate(" + mpWidth + " 0)")
            .attr("height", labelHeight)
            .attr("width", legendWidth)

        // textprojMultLegend.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", legendWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        textProjMult02 = d3.select('#topLabel')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth) + " 0)")
            .append('svg')
            .attr('id', 'textProjMult02')
            .attr("height", labelHeight)
            .attr("width", mpWidth)

        // textProjMult02.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", mpWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        textProjMult02 = d3.select('#textProjMult02')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (mpWidth/2))
            .attr("y", (labelHeight/2))
            .text("t-Distributed Stochastic Neighbor Embedding - tSNE")
            // .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        lampEaggTreemapLabelBox = d3.select('#topLabel')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth+mpWidth) + " 0)")
            .append('svg')
            .attr('id', 'lampEaggTreemapLabelBox')
            .attr("height", labelHeight)
            .attr("width", treemapEaggWidth)

        // lampEaggTreemapLabelBox.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '1')

        lampEaggTreemapLabel = d3.select('#lampEaggTreemapLabelBox')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (treemapEaggWidth/2))
            .attr("y", (labelHeight/2))
            .text(() => {
                if(language === 'en'){
                    return 'Normalized Aggregated Error | LAMP'
                } else if (language === 'ptbr') {
                    return 'Erro Agregado Normalizado | LAMP'
                }
            })
            .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        projMult01Box = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate( 0 " + (labelHeight) + ")")

        projMult01 = projMult01Box
            .append('svg')
            .attr('id', 'projMult01')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .on('mousedown', () => {
                if (d3.event.button === 0) {
                    projMult01.call(dragSvg1); // habilitando o brush livre no botão direito do mouse
                } else if (d3.event.button === 2) {
                    projMult01.call(zoomSvg1); // habilitando o zoom no botão esquerdo do mouse
                }
            })

        projMult01.append('rect')
            .attr('id', 'projMult01Rect')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .style("fill", rectBackground)
            .style("stroke", "gray")
            .style("stroke-width", 0.5)

        /*--------------------------------------------*/

        projMultLegend = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'projMultLegend')
            .attr("transform", "translate(" + mpWidth + " " + labelHeight + ")")
            .attr("height", mpHeight)
            .attr("width", legendWidth)

        /*--------------------------------------------*/

        projMult02Box = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth) + " " + labelHeight + ")")

        projMult02 = projMult02Box
            .append('svg')
            .attr('id', 'projMult02')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .on('mousedown', () => {
                if (d3.event.button === 0) {
                    projMult02.call(dragSvg2); // habilitando o brush livre no botão direito do mouse
                } else if (d3.event.button === 2) {
                    projMult02.call(zoomSvg2); // habilitando o zoom no botão esquerdo do mouse
                }
            })

        projMult02.append('rect')
            .attr('id', 'projMult02Rect')
            .attr("height", mpHeight)
            .attr("width", mpWidth)
            .style("fill", rectBackground)
            .style("stroke", "gray")
            .style("stroke-width", 0.5)

        lampEaggTreemapBox = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'lampEaggTreemapBox')
            .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + labelHeight + ")")

        lampEaggTreemap = lampEaggTreemapBox
            .append('svg')
            .attr('id', 'lampEaggTreemap')
            .attr("height", treemapEaggHeight)
            .attr("width", treemapEaggWidth)

        // lampEaggTreemap.append('rect')
        //     .attr("height", ((mpHeight+legendWidth)/2)-labelHeight)
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "red")
        //     .style("stroke", "gray")
        //     .style("stroke-width", '4')

        /*--------------------------------------------*/

        // treemapLegend = d3.select('#viewboxMain')
        //     .append('g')
        //     .attr('id', 'treemapLegend')
        //     .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + (treemapEaggHeight) + ")")
        //     .attr("height", (labelHeight*2.5))
        //     .attr("width", treemapEaggWidth)

        // treemapLegend.append('rect')
        //     .attr("height", (labelHeight*2.5))
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "red")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        tsneEaggTreemapLabelBox = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + (treemapEaggHeight+labelHeight*1.5) + ")")
            .attr('id', 'tsneEaggTreemapLabelBox')
            .attr("height", labelHeight)
            .attr("width", treemapEaggWidth)

        // tsneEaggTreemapLabel.append('rect')
        //     .attr("height", labelHeight)
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "green")
        //     .style("stroke-width", '1')

        tsneEaggTreemapLabel = d3.select('#tsneEaggTreemapLabelBox')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (treemapEaggWidth/2))
            .attr("y", (labelHeight/2))
            .text(() => {
                if(language === 'en'){
                    return 'Normalized Aggregated Error | tSNE'
                } else if (language === 'ptbr') {
                    return 'Erro Agregado Normalizado | tSNE'
                }
            })
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        tsneEaggTreemapBox = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'tsneEaggTreemapBox')
            .attr("transform", "translate(" + (mpWidth*2+legendWidth) + " " + (treemapEaggHeight+labelHeight*2.5) + ")")

        tsneEaggTreemap = tsneEaggTreemapBox
            .append('svg')
            .attr('id', 'tsneEaggTreemap')
            .attr("height", (treemapEaggHeight))
            .attr("width", treemapEaggWidth)

        // tsneEaggTreemap.append('rect')
        //     .attr("height", (treemapEaggHeight))
        //     .attr("width", treemapEaggWidth)
        //     .style("fill", "transparent")
        //     .style("stroke", "blue")
        //     .style("stroke-width", '1')

        /*--------------------------------------------*/

        sliderLampBox = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(0 " + (labelHeight+mpHeight) + ")")
            .append('svg')
            .attr('id', 'sliderLampBox')
            .attr("height", sliderHeight)
            .attr("width", mpWidth)

        sliderLampHtml = sliderLampBox
            .append("foreignObject")
            .attr("height", sliderHeight)
            .attr("width", mpWidth)
            .append("xhtml:body")
            .attr("id", "sliderLampHtml")

        sliderLamp = sliderLampHtml
            .append("div")
            .attr("id", "sliderLamp")
            .style("height", (18)+'px')
            .style("width", (mpWidth-50) +'px')
            .style('left', "15px")

        /*--------------------------------------------*/

        sliderTsneBox = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (mpWidth+legendWidth) + " " + (labelHeight+mpHeight) + ")")
            .append('svg')
            .attr('id', 'sliderTsneBox')
            .attr("height", sliderHeight)
            .attr("width", mpWidth)

        sliderTsneHtml = sliderTsneBox
            .append("foreignObject")
            .attr("height", sliderHeight)
            .attr("width", mpWidth)
            .append("xhtml:body")
            .attr("id", "sliderTsneHtml")

        // sliderTsne = sliderTsneHtml
        //     .append("div")
        //     .attr("id", "sliderTsne")
        //     .style("height", (18)+'px')
        //     .style("width", (mpWidth-50) +'px')
        //     .style('left', "15px")

        /*--------------------------------------------*/

        tableLabel = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'tableLabel')
            .attr("transform", "translate( 0 " + (labelHeight+(labelHeight/2)+mpHeight+legendWidth) + ")")
            // .append('svg')
            .attr("height", labelHeight)
            .attr("width", screenWidth-margin.right)

        tableLabel = d3.select('#tableLabel')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (screenWidth-margin.right)/2)
            .attr("y", labelHeight/2)
            .text(() => {
                if(language === 'en'){
                    return 'Table View'
                } else if (language === 'ptbr') {
                    return 'Visão Tabular'
                }
            })
            // .style('font-size', '15px')
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        // tableBox = d3.select('body')
        //     .append('div')
        //     .attr('id', 'tableBox')
        //     // .attr("height", tableHeight)
        //     .style("width", screenWidth)

        divClass = d3.select("body")
            .append("div")
            .attr("class", "tooltipClass")
            .style("opacity", '0')
            .style("left", "400px")
            .style("top", "15px")

        divTreemap = d3.select("body")
            .append("div")
            .attr("class", "tooltipTreemap")
            .style("opacity", '0')
            .style("left", "500px")
            .style("top", "15px")

    }

    function linkedViewsDistancePreservation() {

        d3.select(".vis").selectAll("*").remove()

        viewport = d3.select(".vis")
            .append("svg")
            .attr('id', 'viewport')
            .attr("height", labelHeight*4+mpHeight+legendWidth)
            .attr("width", screenWidth-margin.right)
            .on('contextmenu', () => {
                d3.event.preventDefault(); // desabilitando a função menu de contexto do botão direito do mouse nas projeções
            });

        // viewport.append('rect')
        //     .attr("height", screenHeight-margin.bottom)
        //     .attr("width", screenWidth-margin.right)
        //     .style("fill", "transparent")
        //     .style("stroke", "gray")
        //     .style("stroke-width", 0.5)

        /*--------------------------------------------*/

        sideBarLeft_()

        sideBarRight_()

        sideBar_()

        ////////////////////////

        let neighbors = d3.select('.neighbors')
            .append("foreignObject")
            .attr("height", ((distancePreservationMpHeight + legendWidth) / 2) - labelHeight)
            .attr("width", distancePreservationWidth)
            .append("xhtml:body")
            .html(() => {
                if(language === 'en'){
                    return "<form>" +
                        "<input type=checkbox id=checkFalse class=ckeck checked/>False<br>" +
                        "<input type=checkbox id=checkTrue class=ckeck checked/>True<br>" +
                        "<input type=checkbox id=checkMissing class=ckeck checked/>Missing<br>" +
                        "</form>"
                } else if (language === 'ptbr') {
                    return "<form>" +
                        "<input type=checkbox id=checkFalse class=ckeck checked/>Falso<br>" +
                        "<input type=checkbox id=checkTrue class=ckeck checked/>Verdadeiro<br>" +
                        "<input type=checkbox id=checkMissing class=ckeck checked/>Ausente<br>" +
                        "</form>"
                }
            })
            .on("click", () => {

                if (d3.select("#checkFalse").property("checked")) {
                    d3.selectAll("circle")
                        .filter(a => intersectionPointsFalse.indexOf(a.id) > -1)
                        .style("fill", colorScaleDistance(-1))
                        .style("opacity", circleOpacity)
                } else {
                    d3.selectAll("circle")
                        .filter(a => intersectionPointsFalse.indexOf(a.id) > -1)
                        .style("fill", 'white')
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")) {
                    d3.selectAll("circle")
                        .filter(a => intersectionPointsTrue.indexOf(a.id) > -1)
                        .style("fill", colorScaleDistance(0))
                        .style("opacity", circleOpacity)
                } else {
                    d3.selectAll("circle")
                        .filter(a => intersectionPointsTrue.indexOf(a.id) > -1)
                        .style("fill", 'white')
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")) {
                    d3.selectAll("circle")
                        .filter(a => intersectionPointsMissing.indexOf(a.id) > -1)
                        .style("fill", colorScaleDistance(1))
                        .style("opacity", circleOpacity)
                } else {
                    d3.selectAll("circle")
                        .filter(a => intersectionPointsMissing.indexOf(a.id) > -1)
                        .style("fill", 'white')
                        .style("opacity", circleOpacity)
                }

            })

        /*--------------------------------------------*/

        viewboxMain = d3.select('#viewport')
            .append('g')
            .attr("transform", "translate( 0 " + (topBarHeight*1.5) + ")")
            .attr('id', 'viewboxMain')
            .attr("height", screenHeight-margin.bottom-topBarHeight)
            .attr("width", screenWidth-margin.right)

        /*--------------------------------------------*/

        topLabel = viewboxMain
            .append('g')
            .attr('id', 'topLabel')
            .attr("height", labelHeight)
            .attr("width", screenWidth-margin.right)

        /*--------------------------------------------*/

        textProjMult01 = d3.select('#topLabel')
            .append('g')
            .attr('id', 'textProjMult01')
            .attr("height", labelHeight)
            .attr("width", distancePreservationMpWidth)

        textProjMult01 = d3.select('#textProjMult01')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (distancePreservationMpWidth/2))
            .attr("y", (labelHeight/2))
            .text("Local Affine Multidimensional Projection - LAMP")
            // .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        textprojMultLegend = d3.select('#topLabel')
            .append('g')
            .attr('id', 'textprojMultLegend')
            // .append('svg')
            .attr("transform", "translate(" + distancePreservationMpWidth + " 0)")
            .attr("height", labelHeight)
            .attr("width", legendWidth)

        /*--------------------------------------------*/

        textProjMult02 = d3.select('#topLabel')
            .append('g')
            .attr("transform", "translate(" + (distancePreservationMpWidth+legendWidth) + " 0)")
            .append('svg')
            .attr('id', 'textProjMult02')
            .attr("height", labelHeight)
            .attr("width", distancePreservationMpWidth)

        textProjMult02 = d3.select('#textProjMult02')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (distancePreservationMpWidth/2))
            .attr("y", (labelHeight/2))
            .text("t-Distributed Stochastic Neighbor Embedding - tSNE")
            // .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        projMult01Box = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate( 0 " + (labelHeight) + ")")

        projMult01 = projMult01Box
            .append('svg')
            .attr('id', 'projMult01')
            .attr("height", distancePreservationMpHeight)
            .attr("width", distancePreservationMpWidth)
            .on('mousedown', () => {
                if (d3.event.button === 0) {
                    projMult01.call(dragSvg1); // habilitando o brush livre no botão direito do mouse
                } else if (d3.event.button === 2) {
                    projMult01.call(zoomSvg1); // habilitando o zoom no botão esquerdo do mouse
                }
            })

        projMult01.append('rect')
            .attr('id', 'projMult01Rect')
            .attr("height", distancePreservationMpHeight)
            .attr("width", distancePreservationMpWidth)
            .style("fill", rectBackground)
            .style("stroke", "gray")
            .style("stroke-width", 0.5)

        /*--------------------------------------------*/

        projMultLegend = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'projMultLegend')
            .attr("transform", "translate(" + distancePreservationMpWidth + " " + labelHeight + ")")
            .attr("height", distancePreservationMpHeight)
            .attr("width", legendWidth)

        /*--------------------------------------------*/

        projMult02Box = d3.select('#viewboxMain')
            .append('g')
            .attr("transform", "translate(" + (distancePreservationMpWidth+legendWidth) + " " + labelHeight + ")")

        projMult02 = projMult02Box
            .append('svg')
            .attr('id', 'projMult02')
            .attr("height", distancePreservationMpHeight)
            .attr("width", distancePreservationMpWidth)
            .on('mousedown', () => {
                if (d3.event.button === 0) {
                    projMult02.call(dragSvg2); // habilitando o brush livre no botão direito do mouse
                } else if (d3.event.button === 2) {
                    projMult02.call(zoomSvg2); // habilitando o zoom no botão esquerdo do mouse
                }
            })

        projMult02.append('rect')
            .attr('id', 'projMult02Rect')
            .attr("height", distancePreservationMpHeight)
            .attr("width", distancePreservationMpWidth)
            .style("fill", rectBackground)
            .style("stroke", "gray")
            .style("stroke-width", 0.5)

        tableLabel = d3.select('#viewboxMain')
            .append('g')
            .attr('id', 'tableLabel')
            .attr("transform", "translate( 0 " + (labelHeight+(labelHeight/2)+distancePreservationMpHeight) + ")")
            .attr("height", labelHeight)
            .attr("width", screenWidth-margin.right)

        tableLabel = tableLabel
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (screenWidth-margin.right)/2)
            .attr("y", labelHeight/2)
            .text(() => {
                if(language === 'en'){
                    return 'Table View'
                } else if (language === 'ptbr') {
                    return 'Visão Tabular'
                }
            })
            // .style('font-size', '15px')
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        /*--------------------------------------------*/

        // tableBox = d3.select('body')
        //     .append('div')
        //     .attr('id', 'tableBox')
        //     // .attr("height", tableHeight)
        //     .style("width", screenWidth)

        divClass = d3.select("body")
            .append("div")
            .attr("class", "tooltipClass")
            .style("opacity", '0')
            .style("left", "400px")
            .style("top", "15px")

    }

//////////////////////////////////////////////////

// -- dataset iris --

    minEaggLampIris = d3v4.min(files[0].point, (d) => d.eagg)
    maxEaggLampIris = d3v4.max(files[0].point, (d) => d.eagg)
    minEaggTsneIris = d3v4.min(files[1].point, (d) => d.eagg)
    maxEaggTsneIris = d3v4.max(files[1].point, (d) => d.eagg)

    let normalizeLampIris = d3.scale.linear()
        .domain([minEaggLampIris,maxEaggLampIris])
        .range([0,1]);

    let normalizeTsneIris = d3.scale.linear()
        .domain([minEaggTsneIris,maxEaggTsneIris])
        .range([0,1]);

    const classesIris = [1, 2, 3];
    const nClassesIris = classesIris.length;
    corClassesIris = colorbrewer.Set1[nClassesIris];
    corEaggIris = colorbrewer.SequentialMultiHue['YlGnBu']

    function colorsLampIris(a) {
        const colorsLamp1 = d3v4.scaleQuantize()
            .domain([minEaggLampIris,maxEaggLampIris])
            .range(corEaggIris);
        return colorsLamp1(a)
    }

    function colorsTsneIris(b) {
        const colorsTsne1 = d3v4.scaleQuantize()
            .domain([minEaggTsneIris, maxEaggTsneIris])
            .range(corEaggIris);
        return colorsTsne1(b)
    }

    function colorsClassIris(c){
        let corClasse1 = d3v4.scaleOrdinal()
            .domain(classesIris)
            .range(corClassesIris);
        return  corClasse1(c);
    }

    // -- dataset segmentation --

    tableContent(files[11])

    minEaggLampSeg = d3v4.min(files[3].point, (d) => d.eagg)
    maxEaggLampSeg = d3v4.max(files[3].point, (d) => d.eagg)
    minEaggTsneSeg = d3v4.min(files[4].point, (d) => d.eagg)
    maxEaggTsneSeg = d3v4.max(files[4].point, (d) => d.eagg)

    let normalizeLampSeg = d3.scale.linear()
        .domain([minEaggLampSeg,maxEaggLampSeg])
        .range([0,1]);

    let normalizeTsneSeg = d3.scale.linear()
        .domain([minEaggTsneSeg,maxEaggTsneSeg])
        .range([0,1]);

    const classesSeg = [0, 1, 2, 3, 4, 5, 6];
    const nClassesSeg = classesSeg.length;
    corClassesSeg = colorbrewer.Set1[nClassesSeg];
    corEaggSeg = colorbrewer.SequentialMultiHue['GnBu']

    function colorsLampSeg(a) {
        const colorsLamp1 = d3v4.scaleQuantize()
            .domain([minEaggLampSeg,maxEaggLampSeg])
            .range(corEaggSeg);
        return colorsLamp1(a)
    }

    function colorsTsneSeg(b) {
        const colorsTsne1 = d3v4.scaleQuantize()
            .domain([minEaggTsneSeg, maxEaggTsneSeg])
            .range(corEaggSeg);
        return colorsTsne1(b)
    }

    function colorsClassSeg(c){
        let corClasse1 = d3v5.scaleOrdinal()
            .domain(classesSeg)
            .range(corClassesSeg);
        return  corClasse1(c);
    }

    // -- dataset concrete --

    minEaggLampConcrete = d3v4.min(files[6].point, (d) => d.eagg)
    maxEaggLampConcrete = d3v4.max(files[6].point, (d) => d.eagg)
    minEaggTsneConcrete = d3v4.min(files[7].point, (d) => d.eagg)
    maxEaggTsneConcrete = d3v4.max(files[7].point, (d) => d.eagg)

    let normalizeLampConcrete = d3.scale.linear()
        .domain([minEaggLampConcrete,maxEaggLampConcrete])
        .range([0,1]);

    let normalizeTsneConcrete = d3.scale.linear()
        .domain([minEaggTsneConcrete,maxEaggTsneConcrete])
        .range([0,1]);

    const classesConcrete = [1, 2, 3, 4];
    const nClassesConcrete = classesConcrete.length;
    corClassesConcrete = colorbrewer.Set1[nClassesConcrete];
    corEaggConcrete = colorbrewer.SequentialMultiHue['YlGnBu']

    function colorsLampConcrete(a) {
        const colorsLamp1 = d3v4.scaleQuantize()
            .domain([minEaggLampConcrete,maxEaggLampConcrete])
            .range(corEaggConcrete);
        return colorsLamp1(a)
    }

    function colorsTsneConcrete(b) {
        const colorsTsne1 = d3v4.scaleQuantize()
            .domain([minEaggTsneConcrete, maxEaggTsneConcrete])
            .range(corEaggConcrete);
        return colorsTsne1(b)
    }

    function colorsClassConcrete(c){
        let corClasse1 = d3v5.scaleOrdinal()
            .domain(classesConcrete)
            .range(corClassesConcrete);
        return  corClasse1(c);
    }

    // -- dataset wine --

    minEaggLampWine = d3v4.min(files[9].point, (d) => d.eagg)
    maxEaggLampWine = d3v4.max(files[9].point, (d) => d.eagg)
    minEaggTsneWine = d3v4.min(files[10].point, (d) => d.eagg)
    maxEaggTsneWine = d3v4.max(files[10].point, (d) => d.eagg)

    let normalizeLampWine = d3.scale.linear()
        .domain([minEaggLampWine,maxEaggLampWine])
        .range([0,1]);

    let normalizeTsneWine = d3.scale.linear()
        .domain([minEaggTsneWine,maxEaggTsneWine])
        .range([0,1]);

    const classesWine = [1, 2, 3];
    const nClassesWine = classesWine.length;
    corClassesWine = colorbrewer.Set1[nClassesWine];
    corEaggWine = colorbrewer.SequentialMultiHue['YlGnBu']

    function colorsLampWine(a) {
        const colorsLamp1 = d3v4.scaleQuantize()
            .domain([minEaggLampWine,maxEaggLampWine])
            .range(corEaggWine);
        return colorsLamp1(a)
    }

    function colorsTsneWine(b) {
        const colorsTsne1 = d3v4.scaleQuantize()
            .domain([minEaggTsneWine, maxEaggTsneWine])
            .range(corEaggWine);
        return colorsTsne1(b)
    }

    function colorsClassWine(c){
        let corClasse1 = d3v5.scaleOrdinal()
            .domain(classesWine)
            .range(corClassesWine);
        return  corClasse1(c);
    }

    /* color scale distance */

    const corFalse = colorbrewer.Reds[4].slice(2)
    const corTrue = '#31a354'
    const corMissing = colorbrewer.Blues[4].slice(2)

    /* -- dados do treemap -- */

    /* -- dataset segmentation -- */

    let lampEaggNormalizeSeg=[];
    files[3].point.map((d) => lampEaggNormalizeSeg.push(normalizeLampSeg(d.eagg)))

    let lampEaggTreemapDataSeg = {
        name: "lamp",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            {name: "0.7 - 0.79",
                children: [
                ]
            },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]
    }

    /* -- lamp dataset iris -- */

    let lampEaggNormalizeIris=[];
    files[0].point.map((d) => lampEaggNormalizeIris.push(normalizeLampIris(d.eagg)))

    let lampEaggTreemapDataIris = {
        name: "lamp",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            {name: "0.7 - 0.79",
                children: [
                ]
            },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]

    }

    /* -- dataset concrete -- */

    let lampEaggNormalizeConcrete=[];
    files[6].point.map((d) => lampEaggNormalizeConcrete.push(normalizeLampConcrete(d.eagg)))

    let lampEaggTreemapDataConcrete = {
        name: "lamp",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            {name: "0.7 - 0.79",
                children: [
                ]
            },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]
    }

    /* -- dataset wine -- */

    let lampEaggNormalizeWine=[];

    files[9].point.map((d) => lampEaggNormalizeWine.push(normalizeLampWine(d.eagg)))

    let lampEaggTreemapDataWine = {
        name: "lamp",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            // {name: "0.7 - 0.79",
            //     children: [
            //     ]
            // },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]
    }

    lampTreemapData()

    function lampTreemapData() {

        /* -- lamp dataset segmentation -- */

        lampEaggNormalizeSeg.map((d, index) => {

            const base = 3
            const vlr = 1

            if ((d >= 0) && (d < 0.1)) {

                lampEaggTreemapDataSeg.children[0].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0 - 0.09',
                        value: vlr
                    })

            } else if ((d >= 0.1) && (d < 0.2)) {

                lampEaggTreemapDataSeg.children[1].children.push({
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.1 - 0.19',
                        value: vlr
                    })

            } else if ((d >= 0.2) && (d < 0.3)) {
                lampEaggTreemapDataSeg.children[2].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.2 - 0.29',
                        value: vlr
                    })
            } else if ((d >= 0.3) && (d < 0.4)) {
                lampEaggTreemapDataSeg.children[3].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.3 - 0.39',
                        value: vlr
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {
                lampEaggTreemapDataSeg.children[4].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.4 - 0.49',
                        value: vlr
                    })
            } else if ((d >= 0.5) && (d < 0.6)) {
                lampEaggTreemapDataSeg.children[5].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.5 - 0.59',
                        value: vlr
                    })
            } else if ((d >= 0.6) && (d < 0.7)) {
                lampEaggTreemapDataSeg.children[6].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.6 - 0.69',
                        value: vlr
                    })
            } else if ((d >= 0.7) && (d < 0.8)) {
                lampEaggTreemapDataSeg.children[7].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.7 - 0.79',
                        value: vlr
                    })
            } else if ((d >= 0.8) && (d < 0.9)) {
                lampEaggTreemapDataSeg.children[8].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.8 - 0.89',
                        value: vlr
                    })
            } else if (d >= 0.9) {
                lampEaggTreemapDataSeg.children[9].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.9 - 1',
                        value: vlr
                    })
            }
        })

        /* ordenar os erros do treemap */
        lampEaggTreemapDataSeg.children.map((element, index)=>{
            lampEaggTreemapDataSeg.children[index].children = lampEaggTreemapDataSeg.children[index].children.sort((a, b) => a.error - b.error)
        })

        /* -- lamp dataset iris -- */

        lampEaggNormalizeIris.map((d, index) => {

            if ((d >= 0) && (d < 0.1)) {

                lampEaggTreemapDataIris.children[0].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0 - 0.09',
                        value: 1
                    })
            } else if ((d >= 0.1) && (d < 0.2)) {

                lampEaggTreemapDataIris.children[1].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.1 - 0.19',
                        value: 1
                    })
            } else if ((d >= 0.2) && (d < 0.3)) {

                lampEaggTreemapDataIris.children[2].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.2 - 0.29',
                        value: 1
                    })
            } else if ((d >= 0.3) && (d < 0.4)) {

                lampEaggTreemapDataIris.children[3].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.3 - 0.39',
                        value: 1
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {

                lampEaggTreemapDataIris.children[4].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.4 - 0.49',
                        value: 1
                    })
            } else if ((d >= 0.5) && (d < 0.6)) {

                lampEaggTreemapDataIris.children[5].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.5 - 0.59',
                        value: 1
                    })
            } else if ((d >= 0.6) && (d < 0.7)) {

                lampEaggTreemapDataIris.children[6].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.6 - 0.69',
                        value: 1
                    })
            } else if ((d >= 0.7) && (d < 0.8)) {

                lampEaggTreemapDataIris.children[7].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.7 - 0.79',
                        value: 1
                    })
            } else if ((d >= 0.8) && (d < 0.9)) {

                lampEaggTreemapDataIris.children[8].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.8 - 0.89',
                        value: 1
                    })
            } else if (d >= 0.9) {

                lampEaggTreemapDataIris.children[9].children.push(
                    {
                        name: index,
                        error: files[0].point[index].eagg,
                        class: files[0].point[index].class,
                        parent: '0.9 - 1',
                        value: 1
                    })
            }
        })

        /* ordenar os erros do treemap Iris */

        lampEaggTreemapDataIris.children.map((element, index)=>{
            lampEaggTreemapDataIris.children[index].children = lampEaggTreemapDataIris.children[index].children.sort((a, b) => a.error - b.error)
        })

        /* -- lamp dataset concrete -- */

        lampEaggNormalizeConcrete.map((d, index) => {

            const base = 6
            const vlr = 1

            if ((d >= 0) && (d < 0.1)) {

                lampEaggTreemapDataConcrete.children[0].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0 - 0.09',
                        value: vlr
                    })

            } else if ((d >= 0.1) && (d < 0.2)) {

                lampEaggTreemapDataConcrete.children[1].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.1 - 0.19',
                        value: vlr
                    })

            } else if ((d >= 0.2) && (d < 0.3)) {

                lampEaggTreemapDataConcrete.children[2].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.2 - 0.29',
                        value: vlr
                    })

            } else if ((d >= 0.3) && (d < 0.4)) {

                lampEaggTreemapDataConcrete.children[3].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.3 - 0.39',
                        value: vlr
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {

                lampEaggTreemapDataConcrete.children[4].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.4 - 0.49',
                        value: vlr
                    })

            } else if ((d >= 0.5) && (d < 0.6)) {

                lampEaggTreemapDataConcrete.children[5].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.5 - 0.59',
                        value: vlr
                    })

            } else if ((d >= 0.6) && (d < 0.7)) {

                lampEaggTreemapDataConcrete.children[6].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.6 - 0.69',
                        value: vlr
                    })

            } else if ((d >= 0.7) && (d < 0.8)) {

                lampEaggTreemapDataConcrete.children[7].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.7 - 0.79',
                        value: vlr
                    })

            } else if ((d >= 0.8) && (d < 0.9)) {

                lampEaggTreemapDataConcrete.children[8].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.8 - 0.89',
                        value: vlr
                    })
            } else if (d >= 0.9) {

                lampEaggTreemapDataConcrete.children[9].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.9 - 1',
                        value: vlr
                    })
            }
        })

        /* ordenar os erros do treemap */
        lampEaggTreemapDataConcrete.children.map((element, index)=>{
            lampEaggTreemapDataConcrete.children[index].children = lampEaggTreemapDataConcrete.children[index].children.sort((a, b) => a.error - b.error)
        })

        /* -- lamp dataset wine -- */

        lampEaggNormalizeWine.map((d, index) => {

            const base = 9
            const vlr = 1

            if ((d >= 0) && (d < 0.1)) {

                lampEaggTreemapDataWine.children[0].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0 - 0.09',
                        value: vlr
                    })

            } else if ((d >= 0.1) && (d < 0.2)) {

                lampEaggTreemapDataWine.children[1].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.1 - 0.19',
                        value: vlr
                    })

            } else if ((d >= 0.2) && (d < 0.3)) {

                lampEaggTreemapDataWine.children[2].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.2 - 0.29',
                        value: vlr
                    })

            } else if ((d >= 0.3) && (d < 0.4)) {

                lampEaggTreemapDataWine.children[3].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.3 - 0.39',
                        value: vlr
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {

                lampEaggTreemapDataWine.children[4].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.4 - 0.49',
                        value: vlr
                    })

            } else if ((d >= 0.5) && (d < 0.6)) {

                lampEaggTreemapDataWine.children[5].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.5 - 0.59',
                        value: vlr
                    })

            } else if ((d >= 0.6) && (d < 0.7)) {

                lampEaggTreemapDataWine.children[6].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.6 - 0.69',
                        value: vlr
                    })

            }
            // else if ((d >= 0.7) && (d < 0.8)) {
            //
            //     lampEaggTreemapDataWine.children[7].children.push(
            //         {
            //             name: index,
            //             error: files[base].point[index].eagg,
            //             class: files[base].point[index].class,
            //             parent: '0.7 - 0.79',
            //             value: vlr
            //         })
            //
            // }
            else if ((d >= 0.8) && (d < 0.9)) {

                lampEaggTreemapDataWine.children[7].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.8 - 0.89',
                        value: vlr
                    })
            } else if (d >= 0.9) {

                lampEaggTreemapDataWine.children[8].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.9 - 1',
                        value: vlr
                    })
            }
        })

        /* ordenar os erros do treemap */
        lampEaggTreemapDataWine.children.map((element, index)=>{
            lampEaggTreemapDataWine.children[index].children = lampEaggTreemapDataWine.children[index].children.sort((a, b) => a.error - b.error)
        })

    }

    /* -- tsne dataset segmentation -- */

    let tsneEaggNormalizeSeg=[];
    files[4].point.map((d) => tsneEaggNormalizeSeg.push(normalizeTsneSeg(d.eagg)))

    let tsneEaggTreemapDataSeg = {
        name: "tsne",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            {name: "0.7 - 0.79",
                children: [
                ]
            },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]
    }

    /* -- tsne dataset iris -- */

    let tsneEaggNormalizeIris=[];
    files[1].point.map((d) => tsneEaggNormalizeIris.push(normalizeTsneIris(d.eagg)))

    let tsneEaggTreemapDataIris = {
        name: "tsne",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            {name: "0.7 - 0.79",
                children: [
                ]
            },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]
    }

    /* -- tsne dataset concrete -- */

    let tsneEaggNormalizeConcrete=[];
    files[7].point.map((d) => tsneEaggNormalizeConcrete.push(normalizeTsneConcrete(d.eagg)))

    let tsneEaggTreemapDataConcrete = {
        name: "tsne",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            {name: "0.7 - 0.79",
                children: [
                ]
            },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]

    }

    /* -- tsne dataset wine -- */

    let tsneEaggNormalizeWine=[];
    files[10].point.map((d) => tsneEaggNormalizeWine.push(normalizeTsneWine(d.eagg)))

    let tsneEaggTreemapDataWine = {
        name: "tsne",
        children: [
            {name: "0 - 0.09",
                children: [
                ]
            },
            {name: "0.1 - 0.19",
                children: [
                ]
            },
            {name: "0.2 - 0.29",
                children: [
                ]
            },
            {name: "0.3 - 0.39",
                children: [
                ]
            },
            {name: "0.4 - 0.49",
                children: [
                ]
            },
            {name: "0.5 - 0.59",
                children: [
                ]
            },
            {name: "0.6 - 0.69",
                children: [
                ]
            },
            {name: "0.7 - 0.79",
                children: [
                ]
            },
            {name: "0.8 - 0.89",
                children: [
                ]
            },
            {name: "0.9 - 1",
                children: [
                ]
            }
        ]

    }

    tsneTreemapData()

    function tsneTreemapData() {

        /* -- tsne dataset seg -- */

        tsneEaggNormalizeSeg.map((d, index) => {
            if ((d >= 0) && (d < 0.1)) {
                tsneEaggTreemapDataSeg.children[0].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0 - 0.09',
                        value: 1
                    })
            } else if ((d >= 0.1) && (d < 0.2)) {
                tsneEaggTreemapDataSeg.children[1].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.1 - 0.19',
                        value: 1
                    })
            } else if ((d >= 0.2) && (d < 0.3)) {
                tsneEaggTreemapDataSeg.children[2].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.2 - 0.29',
                        value: 1
                    })
            } else if ((d >= 0.3) && (d < 0.4)) {
                tsneEaggTreemapDataSeg.children[3].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.3 - 0.39',
                        value: 1
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {
                tsneEaggTreemapDataSeg.children[4].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.4 - 0.49',
                        value: 1
                    })
            } else if ((d >= 0.5) && (d < 0.6)) {
                tsneEaggTreemapDataSeg.children[5].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.5 - 0.59',
                        value: 1
                    })
            } else if ((d >= 0.6) && (d < 0.7)) {
                tsneEaggTreemapDataSeg.children[6].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.6 - 0.69',
                        value: 1
                    })
            } else if ((d >= 0.7) && (d < 0.8)) {
                tsneEaggTreemapDataSeg.children[7].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.7 - 0.79',
                        value: 1
                    })
            } else if ((d >= 0.8) && (d < 0.9)) {
                tsneEaggTreemapDataSeg.children[8].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.8 - 0.89',
                        value: 1
                    })
            } else if (d >= 0.9) {
                tsneEaggTreemapDataSeg.children[9].children.push(
                    {
                        name: index,
                        error: files[4].point[index].eagg,
                        class: files[4].point[index].class,
                        parent: '0.9 - 1',
                        value: 1
                    })
            }
        })

        /* ordenar os erros do treemap */
        tsneEaggTreemapDataSeg.children.map((element, index)=>{
            tsneEaggTreemapDataSeg.children[index].children = tsneEaggTreemapDataSeg.children[index].children.sort((a, b) => a.error - b.error)
        })

        /* -- tsne dataset iris -- */

        tsneEaggNormalizeIris.map((d, index) => {

            if ((d >= 0) && (d < 0.1)) {

                tsneEaggTreemapDataIris.children[0].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0 - 0.09',
                        value: 1
                    })
            } else if ((d >= 0.1) && (d < 0.2)) {

                tsneEaggTreemapDataIris.children[1].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.1 - 0.19',
                        value: 1
                    })
            } else if ((d >= 0.2) && (d < 0.3)) {

                tsneEaggTreemapDataIris.children[2].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.2 - 0.29',
                        value: 1
                    })
            } else if ((d >= 0.3) && (d < 0.4)) {

                tsneEaggTreemapDataIris.children[3].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.3 - 0.39',
                        value: 1
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {

                tsneEaggTreemapDataIris.children[4].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.4 - 0.49',
                        value: 1
                    })
            } else if ((d >= 0.5) && (d < 0.6)) {

                tsneEaggTreemapDataIris.children[5].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.5 - 0.59',
                        value: 1
                    })
            } else if ((d >= 0.6) && (d < 0.7)) {

                tsneEaggTreemapDataIris.children[6].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.6 - 0.69',
                        value: 1
                    })
            } else if ((d >= 0.7) && (d < 0.8)) {

                tsneEaggTreemapDataIris.children[7].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.7 - 0.79',
                        value: 1
                    })
            } else if ((d >= 0.8) && (d < 0.9)) {

                tsneEaggTreemapDataIris.children[8].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.8 - 0.89',
                        value: 1
                    })
            } else if (d >= 0.9) {

                tsneEaggTreemapDataIris.children[9].children.push(
                    {
                        name: index,
                        error: files[1].point[index].eagg,
                        class: files[1].point[index].class,
                        parent: '0.9 - 1',
                        value: 1
                    })
            }
        })

        /* ordenar os erros do treemap */
        tsneEaggTreemapDataIris.children.map((element, index)=>{
            tsneEaggTreemapDataIris.children[index].children = tsneEaggTreemapDataIris.children[index].children.sort((a, b) => a.error - b.error)
        })

        /* -- tsne dataset concrete -- */

        tsneEaggNormalizeConcrete.map((d, index) => {

            const base = 7

            if ((d >= 0) && (d < 0.1)) {
                tsneEaggTreemapDataConcrete.children[0].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0 - 0.09',
                        value: 1
                    })
            } else if ((d >= 0.1) && (d < 0.2)) {
                tsneEaggTreemapDataConcrete.children[1].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.1 - 0.19',
                        value: 1
                    })
            } else if ((d >= 0.2) && (d < 0.3)) {
                tsneEaggTreemapDataConcrete.children[2].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.2 - 0.29',
                        value: 1
                    })
            } else if ((d >= 0.3) && (d < 0.4)) {
                tsneEaggTreemapDataConcrete.children[3].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.3 - 0.39',
                        value: 1
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {
                tsneEaggTreemapDataConcrete.children[4].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.4 - 0.49',
                        value: 1
                    })
            } else if ((d >= 0.5) && (d < 0.6)) {

                tsneEaggTreemapDataConcrete.children[5].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.5 - 0.59',
                        value: 1
                    })
            } else if ((d >= 0.6) && (d < 0.7)) {
                tsneEaggTreemapDataConcrete.children[6].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.6 - 0.69',
                        value: 1
                    })
            } else if ((d >= 0.7) && (d < 0.8)) {
                tsneEaggTreemapDataConcrete.children[7].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.7 - 0.79',
                        value: 1
                    })
            } else if ((d >= 0.8) && (d < 0.9)) {
                tsneEaggTreemapDataConcrete.children[8].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.8 - 0.89',
                        value: 1
                    })
            } else if (d >= 0.9) {
                tsneEaggTreemapDataConcrete.children[9].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.9 - 1',
                        value: 1
                    })
            }
        })

        /* ordenar os erros do treemap */
        tsneEaggTreemapDataConcrete.children.map((element, index)=>{
            tsneEaggTreemapDataConcrete.children[index].children = tsneEaggTreemapDataConcrete.children[index].children.sort((a, b) => a.error - b.error)
        })

        /* -- tsne dataset wine -- */

        tsneEaggNormalizeWine.map((d, index) => {

            const base = 10

            if ((d >= 0) && (d < 0.1)) {
                tsneEaggTreemapDataWine.children[0].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0 - 0.09',
                        value: 1
                    })
            } else if ((d >= 0.1) && (d < 0.2)) {
                tsneEaggTreemapDataWine.children[1].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.1 - 0.19',
                        value: 1
                    })
            } else if ((d >= 0.2) && (d < 0.3)) {
                tsneEaggTreemapDataWine.children[2].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.2 - 0.29',
                        value: 1
                    })
            } else if ((d >= 0.3) && (d < 0.4)) {
                tsneEaggTreemapDataWine.children[3].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.3 - 0.39',
                        value: 1
                    })
            } else if ((d >= 0.4) && (d < 0.5)) {
                tsneEaggTreemapDataWine.children[4].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.4 - 0.49',
                        value: 1
                    })
            } else if ((d >= 0.5) && (d < 0.6)) {

                tsneEaggTreemapDataWine.children[5].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.5 - 0.59',
                        value: 1
                    })
            } else if ((d >= 0.6) && (d < 0.7)) {
                tsneEaggTreemapDataWine.children[6].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.6 - 0.69',
                        value: 1
                    })
            } else if ((d >= 0.7) && (d < 0.8)) {
                tsneEaggTreemapDataWine.children[7].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.7 - 0.79',
                        value: 1
                    })
            } else if ((d >= 0.8) && (d < 0.9)) {
                tsneEaggTreemapDataWine.children[8].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.8 - 0.89',
                        value: 1
                    })
            } else if (d >= 0.9) {
                tsneEaggTreemapDataWine.children[9].children.push(
                    {
                        name: index,
                        error: files[base].point[index].eagg,
                        class: files[base].point[index].class,
                        parent: '0.9 - 1',
                        value: 1
                    })
            }
        })

        /* ordenar os erros do treemap */
        tsneEaggTreemapDataWine.children.map((element, index)=>{
            tsneEaggTreemapDataWine.children[index].children = tsneEaggTreemapDataWine.children[index].children.sort((a, b) => a.error - b.error)
        })

    }

    /* -- fim dados treemap -- */

    function mp1ErrorSeg() {

        projMult01.selectAll("circle")
            .data(files[3].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampSeg(d.x))
            .attr("cy", (d) => mpHeight-ySLampSeg(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsLampSeg(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorLamp)
    }

    function mp2ErrorSeg() {

        projMult02.selectAll("circle")
            .data(files[4].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneSeg(d.x))
            .attr("cy", (d) => mpHeight-ySTsneSeg(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsTsneSeg(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorTsne)
    }

    function mp1ClassSeg() {

        projMult01.selectAll("circle")
            .data(files[3].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampSeg(d.x))
            .attr("cy", (d) => mpHeight-ySLampSeg(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassSeg(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)
    }

    function mp2ClassSeg() {

        projMult02.selectAll("circle")
            .data(files[4].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneSeg(d.x))
            .attr("cy", (d) => mpHeight-ySTsneSeg(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassSeg(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)

    }

    function mp1ErrorIris() {

        projMult01.selectAll("circle")
            .data(files[0].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampIris(d.x))
            .attr("cy", (d) => mpHeight-ySLampIris(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsLampIris(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorLamp)
    }

    function mp2ErrorIris() {

        projMult02.selectAll("circle")
            .data(files[1].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneIris(d.x))
            .attr("cy", (d) => mpHeight-ySTsneIris(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsTsneIris(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorTsne)

    }

    function mp1ClassIris() {

        projMult01.selectAll("circle")
            .data(files[0].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampIris(d.x))
            .attr("cy", (d) => mpHeight-ySLampIris(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassIris(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)
    }

    function mp2ClassIris() {

        projMult02.selectAll("circle")
            .data(files[1].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneIris(d.x))
            .attr("cy", (d) => mpHeight-ySTsneIris(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassIris(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)

    }

    function mp1ErrorConcrete() {

        projMult01.selectAll("circle")
            .data(files[6].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampConcrete(d.x))
            .attr("cy", (d) => mpHeight-ySLampConcrete(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsLampConcrete(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorLamp)
    }

    function mp2ErrorConcrete() {

        projMult02.selectAll("circle")
            .data(files[7].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneConcrete(d.x))
            .attr("cy", (d) => mpHeight-ySTsneConcrete(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsTsneConcrete(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorTsne)
    }

    function mp1ClassConcrete() {

        projMult01.selectAll("circle")
            .data(files[6].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampConcrete(d.x))
            .attr("cy", (d) => mpHeight-ySLampConcrete(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassConcrete(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)
    }

    function mp2ClassConcrete() {

        projMult02.selectAll("circle")
            .data(files[7].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneConcrete(d.x))
            .attr("cy", (d) => mpHeight-ySTsneConcrete(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassConcrete(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)
    }

    function mp1ErrorWine() {

        projMult01.selectAll("circle")
            .data(files[9].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampWine(d.x))
            .attr("cy", (d) => mpHeight-ySLampWine(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsLampWine(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorLamp)
    }

    function mp2ErrorWine() {

        projMult02.selectAll("circle")
            .data(files[10].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneWine(d.x))
            .attr("cy", (d) => mpHeight-ySTsneWine(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsTsneWine(d.eagg))
            .style("opacity", circleOpacity)
            .on("mouseover", mouseoverError)
            .on("mouseout", mouseoutError)
            .on('click', clickBrushErrorTsne)
    }

    function mp1ClassWine() {

        projMult01.selectAll("circle")
            .data(files[9].point).enter()
            .append("circle")
            .attr("id", (d) => "ptLamp"+d.id)
            .attr("cx", (d) => xSLampWine(d.x))
            .attr("cy", (d) => mpHeight-ySLampWine(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassWine(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)
    }

    function mp2ClassWine() {

        projMult02.selectAll("circle")
            .data(files[10].point).enter()
            .append("circle")
            .attr("id", (d) => "ptTsne"+d.id)
            .attr("cx", (d) => xSTsneWine(d.x))
            .attr("cy", (d) => mpHeight-ySTsneWine(d.y))
            .attr("class", (d) => "pt"+d.id)
            .attr("r", rPadrao)
            .style("stroke", corBorda)
            .style('stroke-width', '1')
            .style("fill", (d) => colorsClassWine(d.class))
            .style("opacity", circleOpacity)
            .on('click', clickBrushClass)
            .on('mouseover', mouseoverClass)
            .on('mouseout', mouseoutClass)
    }

    function mp1DistancePreservation(dataset) {

        if(datasetChangeselectValue === 'segmentation') {

            projMult01.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSLampSegDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySLampSegDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        } else if(datasetChangeselectValue === 'iris') {

            projMult01.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSLampIrisDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySLampIrisDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        } else if(datasetChangeselectValue === 'concrete') {

            projMult01.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSLampConcreteDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySLampConcreteDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        } else if(datasetChangeselectValue === 'wine') {

            projMult01.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSLampWineDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySLampWineDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        }
    }

    function mp2DistancePreservation(dataset) {

        if(datasetChangeselectValue === 'segmentation') {

            projMult02.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSTsneSegDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySTsneSegDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        } else if(datasetChangeselectValue === 'iris') {

            projMult02.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSTsneIrisDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySTsneIrisDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        } else if(datasetChangeselectValue === 'concrete') {

            projMult02.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSTsneConcreteDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySTsneConcreteDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        } else if(datasetChangeselectValue === 'wine') {

            projMult02.selectAll("circle")
                .data(dataset).enter()
                .append("circle")
                .attr("cx", (d) => xSTsneWineDistancePreservation(d.x))
                .attr("cy", (d) => distancePreservationMpHeight-ySTsneWineDistancePreservation(d.y))
                .attr("class", (d) => "pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
                .style("fill", 'white')
                .style("opacity", circleOpacity)
                .on('mouseover', mouseoverDistance)
                .on('mouseout', mouseoutDistance)
                .on('click', clickBrushDistance)

        }
    }

    function legendaEagg(corEagg) {

        projMultLegend
            .append('g')
            .attr('id', 'mapaDeCoresEagg')
            .attr('class', 'legenda');

        grad = projMultLegend
            .select('#mapaDeCoresEagg')
            .append('defs')
            .append('linearGradient')
            .attr('id', 'grad')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%')

        grad.selectAll('stop')
            .data(corEagg).enter()
            .append('stop')
            .style('stop-color', (d) => d)
            .attr('offset', (d, i) => ((i / (corEagg.length - 1)) * 100)+'%')

        projMultLegend.append('rect')
            .attr('x', ((legendWidth-rectLegendwidth)/2))
            .attr('y', (mpHeight-rectLegendheight)/2)
            .attr('class', 'legenda')
            .attr('width', rectLegendwidth)
            .attr('height', rectLegendheight)
            .attr("stroke", "black")
            .style('fill', 'url(#grad)')
            .attr("transform", "rotate(180"+" "+
                (((legendWidth+rectLegendwidth)/2.7))+" "+
                ((mpHeight+rectLegendheight)/3)+")")

        textprojMultLegend = d3.select('#textprojMultLegend')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (legendWidth/2))
            .attr("y", (labelHeight/2))
            .text(() => {
                if(language === 'en'){
                    return 'Error'
                } else if (language === 'ptbr') {
                    return 'Erro'
                }
            })
            // .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        projMultLegend.append("text")
            .attr('class', 'legenda')
            .attr("x", (legendWidth/2))
            .attr("y", ((mpHeight-rectLegendheight)/2)+rectLegendheight+20)
            .text(() => {
                if(language === 'en'){
                    return 'Low'
                } else if (language === 'ptbr') {
                    return 'Baixo'
                }
            })
            .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        projMultLegend.append("text")
            .attr('class', 'legenda')
            .attr("x", (legendWidth/2))
            .attr("y", ((mpHeight-rectLegendheight)/2)-20)
            .text(() => {
                if(language === 'en'){
                    return 'High'
                } else if (language === 'ptbr') {
                    return 'Alto'
                }
            })
            .style('font-size', fontSizeLayout)
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")
    }

    function legendClass(classes, n, corClasse){

        let size = 15

        textprojMultLegend = d3.select('#textprojMultLegend')
            .append("text")
            .attr('class', 'labelsTop')
            .attr("x", (legendWidth/2))
            .attr("y", (labelHeight/2))
            .text(() => {
                if(language === 'en'){
                    return 'Class'
                } else if (language === 'ptbr') {
                    return 'Classe'
                }
            })
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        projMultLegend.selectAll("mydots")
            .data(classes).enter()
            .append("rect")
            .attr("x", 7.5)
            .attr("y", (d,i) => ((mpHeight-(n*size))/2)+i*size+10)
            .attr("width", size)
            .attr("height", size)
            .attr('class', 'legenda')
            .attr('id', (d) => 'class'+d)
            .style("stroke", corBorda)
            .style("fill", (d) => corClasse(d))
            .attr("opacity", circleOpacity)
            .on('click', clickClass)

        projMultLegend.selectAll("mylabels")
            .data(classes).enter()
            .append("text")
            .attr("x", 28)
            .attr("y", (d,i) => ((mpHeight-(n*size))/2)+i*size+20)
            .attr('class','legenda')
            .style("fill", 'black')
            .text((d) => d)
            .style('font-size', '15px')
            .style("alignment-baseline", "middle")

    }

    function legendDistance(){

        let colorScale = d3v4.scaleLinear()
            .range(legendDistanceColor);

        projMultLegend
            .append('g')
            .attr('id', 'mapaDeCoresEagg')
            .attr('class', 'legenda');

        grad = projMultLegend
            .select('#mapaDeCoresEagg')
            .append('defs')
            .append('linearGradient')
            .attr('id', 'grad')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        grad.selectAll('stop')
            .data(colorScale.range()).enter()
            .append("stop")
            .attr("offset", (d,i) => i/(colorScale.range().length - 1))
            .attr("stop-color", (d) => d);

        projMultLegend.append('rect')
            .attr('x', (legendWidth-rectLegendwidth)/2)
            .attr('y', (distancePreservationMpHeight-rectLegendheight)/2)
            .attr('class', 'legenda')
            .attr('width', rectLegendwidth)
            .attr('height', rectLegendheight)
            .attr("stroke", "black")
            .style('fill', 'url(#grad)')
            .attr("transform", "rotate(180"+" "+
                (((legendWidth+rectLegendwidth)/2.7))+" "+
                ((mpHeight+rectLegendheight)/3)+")")

        textprojMultLegend = d3.select('#textprojMultLegend')
            .append("text")
            // .attr('class', 'legenda')
            .attr('class', 'labelsTop')
            .attr("x", (legendWidth/2))
            .attr("y", (labelHeight/2))
            .text(() => {
                if(language === 'en'){
                    return 'Neighbors'
                } else if (language === 'ptbr') {
                    return 'Vizinhos'
                }
            })
            // .style('font-size', '15px')
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        projMultLegend.append("text")
            .attr('class', 'legenda')
            .attr("x", (legendWidth/2))
            .attr("y", ((mpHeight-rectLegendheight)/2)+rectLegendheight+20)
            .text(() => {
                if(language === 'en'){
                    return 'False'
                } else if (language === 'ptbr') {
                    return 'Falso'
                }
            })
            .style('font-size', '12px')
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

        projMultLegend.append("text")
            .attr('class', 'legenda')
            .attr("x", (legendWidth/2))
            .attr("y", ((mpHeight-rectLegendheight)/2)-20)
            .text(() => {
                if(language === 'en'){
                    return 'Missing'
                } else if (language === 'ptbr') {
                    return 'Ausente'
                }
            })
            .style('font-size', '10px')
            .style('text-anchor',"middle")
            .style('alignment-baseline',"central")

    }

    // legend treemap

    function legendTreemap(corEagg) {

        treemapLegend
            .append('g')
            .attr('id', 'mapaDeCoresTreemap')
            .attr('class', 'legenda');

        linearGradient = treemapLegend
            .select('#mapaDeCoresTreemap')
            .append('defs')
            .append('linearGradient')
            .attr('id', 'linearGradient')
            .attr('x1', '0%')
            .attr('x2', '100%')
            .attr('y1', '0%')
            .attr('y2', '0%');

        linearGradient.selectAll('stop')
            .data(corEagg).enter()
            .append('stop')
            .attr('offset', (d, i) => ((i / (corEagg.length - 1)) * 100)+'%')
            .attr('stop-color', (d) => d)

        treemapLegend.append('rect')
            .attr('x', (treemapEaggWidth-(treemapEaggWidth-20))/2)
            .attr('y', labelHeight)
            .attr('width', (treemapEaggWidth-20))
            .attr('height', labelHeight/2)
            .style("stroke", "gray")
            .style('fill', "url(#linearGradient)")

        let xScale = d3v4.scaleLinear()
            .domain([0, 1])
            .range([0, (treemapEaggWidth-20)])

        let xAxis = d3v4.axisBottom(xScale)
            .ticks(10)
            .tickSize(3)
        // .tickValues(xTicks)

        d3v4.select('#mapaDeCoresTreemap')
            .append('g')
            .attr('width', (treemapEaggWidth-20))
            .attr('height', labelHeight)
            .attr("transform", "translate(" + ((treemapEaggWidth-(treemapEaggWidth-20))/2) + " " + (labelHeight+labelHeight/2+2) + ")")
            .call(xAxis)
            .select(".domain").remove()
    }

    /* -- treemap lamp -- */

    /* -- dataset segmentation -- */

    let lampRootSeg = d3v4.hierarchy(lampEaggTreemapDataSeg)
        .sum((d) => d.value)

    let lampTreemapLayoutSeg = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (lampRootSeg)

    function lampEaggTreemapSeg(){

        if(colorByChangeSelectValue === 'class'){

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootSeg.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapSeg')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                .style("fill", (d) => colorsClassSeg(d.data.class))
                .style("opacity", treemapOpacity)
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp)

        }else{

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootSeg.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapSeg')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsLampSeg(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsLampSeg(d.data.error))
                .style("opacity", '1')
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp)
        }

    }

    /* -- dataset iris -- */

    let lampRootIris = d3v4.hierarchy(lampEaggTreemapDataIris)
        .sum((d) => d.value)

    let lampTreemapLayoutIris = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (lampRootIris)

    function lampEaggTreemapIris(){

        if(colorByChangeSelectValue === 'class'){

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootIris.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapIris')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                .style("fill", (d) => colorsClassIris(d.data.class))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp);

        } else{

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootIris.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapIris')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsLampIris(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsLampIris(d.data.error))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp);

        }

    }

    /* -- dataset concrete -- */

    let lampRootConcrete = d3v4.hierarchy(lampEaggTreemapDataConcrete)
        .sum((d) => d.value)

    let lampTreemapLayoutConcrete = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (lampRootConcrete)

    function lampEaggTreemapConcrete(){

        if(colorByChangeSelectValue === 'class'){

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootConcrete.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapConcrete')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                .style("fill", (d) => colorsClassConcrete(d.data.class))
                .style("opacity", treemapOpacity)
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp)

        }else{

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootConcrete.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapConcrete')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsLampConcrete(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsLampConcrete(d.data.error))
                .style("opacity", '1')
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp)
        }

    }

    /* -- dataset wine -- */

    let lampRootWine = d3v4.hierarchy(lampEaggTreemapDataWine)
        .sum((d) => d.value)

    let lampTreemapLayoutWine = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (lampRootWine)

    function lampEaggTreemapWine(){

        if(colorByChangeSelectValue === 'class'){

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootWine.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapWine')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                .style("fill", (d) => colorsClassWine(d.data.class))
                .style("opacity", treemapOpacity)
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp)

        }else{

            lampEaggTreemap
                .selectAll("rect")
                .data(lampRootWine.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapLamp"+d.data.name)
                .attr('class','lampTreemapWine')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsLampWine(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsLampWine(d.data.error))
                .style("opacity", '1')
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapLamp)
        }

    }

    /* -- treemap tsne -- */

    /* -- dataset segmentation -- */

    let tsneRootSeg = d3v4.hierarchy(tsneEaggTreemapDataSeg)
        .sum((d) => d.value)

    let tsneTreemapLayoutSeg = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (tsneRootSeg)

    function tsneEaggTreemapSeg(){

        if(colorByChangeSelectValue === 'class'){

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootSeg.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapSeg')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                .style("fill", (d) => colorsClassSeg(d.data.class))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        } else {

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootSeg.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapSeg')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsTsneSeg(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsTsneSeg(d.data.error))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        }

    }

    /* -- dataset iris -- */

    let tsneRootIris = d3v4.hierarchy(tsneEaggTreemapDataIris)
        .sum((d) => d.value)

    let tsneTreemapLayoutIris = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (tsneRootIris)

    function tsneEaggTreemapIris(){

        if(colorByChangeSelectValue === 'class'){

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootIris.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapIris')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                // .style("stroke", (d) => colorsClassIris(d.data.class))
                // .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsClassIris(d.data.class))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        } else{

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootIris.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapIris')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsTsneIris(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsTsneIris(d.data.error))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        }

    }

    /* -- dataset concrete -- */

    let tsneRootConcrete = d3v4.hierarchy(tsneEaggTreemapDataConcrete)
        .sum((d) => d.value)

    let tsneTreemapLayoutConcrete = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (tsneRootConcrete)

    function tsneEaggTreemapConcrete(){

        if(colorByChangeSelectValue === 'class'){

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootConcrete.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapConcrete')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                .style("fill", (d) => colorsClassConcrete(d.data.class))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        } else {

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootConcrete.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapConcrete')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsTsneConcrete(d.data.error))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        }

    }

    /* -- dataset wine -- */

    let tsneRootWine = d3v4.hierarchy(tsneEaggTreemapDataWine)
        .sum((d) => d.value)

    let tsneTreemapLayoutWine = d3v4.treemap()
        .size([treemapEaggWidth, treemapEaggHeight])
        .padding(paddingTreemap)
        (tsneRootWine)

    function tsneEaggTreemapWine(){

        if(colorByChangeSelectValue === 'class'){

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootWine.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapWine')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "gray")
                .style("stroke-width", "0.3")
                .style("fill", (d) => colorsClassWine(d.data.class))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        } else {

            tsneEaggTreemap
                .selectAll("rect")
                .data(tsneRootWine.leaves()).enter()
                .append("rect")
                .attr("id", (d) => "treemapTsne"+d.data.name)
                .attr('class','tsneTreemapWine')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", (d) => colorsTsneWine(d.data.error))
                .style("stroke-width", borderTreemap)
                .style("fill", (d) => colorsTsneWine(d.data.error))
                .on('mouseover',mouseoverTreemap)
                .on('mouseout',mouseoutTreemap)
                .on('click', clickBrushTreemapTsne);

        }

    }

    /* -- table -- */

    function tableContent(datasetJson) {

        tableBox = d3.select('body')
            .append('div')
            .attr('id', 'tableBox')
            .style("width", screenWidth)

        table = tableBox
            .append("table")
            // .attr("class", "table")
            .attr("id", "table")
            .attr("align", "center")
            .style("border-collapse", "collapse")
            .style("border", "1px black solid")

        thead = table.append("thead")
            .attr("id", "thead");

        thead.append('tr')
            .selectAll('th')
            .data(d3.keys(datasetJson[0]))
            .enter()
            .append('th')
            .text((d) => d)
        // .style('font-size', '13px');

        tbody = table.append("tbody")
            .attr("id", "tbody")
    }

    function sizeCircleMp(){
        d3.select('#sizeCircle')
            .append('div')
            .attr('id', 'sizeCircleSlider')
            .style("width", '250px')
            .style("height", '13px')
            .call(d3.slider()
                .axis(d3.svg.axis().orient("botton").ticks(10))
                .min(1)
                .max(10)
                .step(0.5)
                .value(rPadrao)
                .on("slide", (evt, value) => {
                    rPadrao = value
                    if (rPadrao < 4){
                        return d3v4.selectAll('circle')
                            .attr("r", rPadrao)
                    } else {
                        return d3v4.selectAll('circle')
                            .attr("r", rPadrao)
                            .style('stroke-width','1')
                    }
                })
            )
    }

    sizeCircleMp()

    /*--------------------------------------------*/

    function backgroundPm(){

        d3.select('#background')
            .append('div')
            .attr('id', 'backgroundSlider')
            .style("width", '250px')
            .style("height", '13px')
            .call(d3.slider()
                .axis(d3.svg.axis().orient("botton").ticks(10))
                // .axis(true)
                .min(1)
                .max(10)
                .step(1)
                .value(2)
                .on("slide", (evt, value) => {
                    let colorValue = value
                    function colorBackgroud(a) {
                        const colorBackgroud = d3.scale.linear()
                            .domain([1,10])
                            .interpolate(d3.interpolateHcl)
                            .range([d3.rgb("#ffffff"), d3.rgb('#bdbdbd')])
                        return colorBackgroud(a)
                    }
                    d3.selectAll('#projMult01Rect, #projMult02Rect')
                        .style("fill", () => colorBackgroud(colorValue))
                })
            )
    }

    backgroundPm()

    /*--------------------------------------------*/

    function transparencyCircleMp(){
        d3.select('#transparencyCircle')
            .append('div')
            .attr('id', 'transparencyCircleSlider')
            .style("width", '250px')
            .style("height", '13px')
            .call(d3.slider()
                .axis(d3.svg.axis().orient("botton").ticks(9))
                .min('0.1')
                .max(1)
                .step('0.1')
                .value(circleOpacity)
                .on("slide", (evt, value) => {
                    circleOpacity = value
                    return d3.selectAll('circle')
                        .style("opacity", circleOpacity)
                })
            )
    }

    transparencyCircleMp()

    /*--------------------------------------------*/

    function treemapBorder() {

        treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

        const radioListTreemapBorderError_en = [
            {"id": 'yes', "name": "Yes", 'checked': false},
            {"id": 'no', "name": "No", 'checked': true}
        ]

        const radioListTreemapBorderError_ptbr = [
            {"id": 'yes', "name": "Sim", 'checked': false},
            {"id": 'no', "name": "Não", 'checked': true}
        ]

        const radioListTreemapBorderClass_en = [
            {"id": 'yes', "name": "Yes", 'checked': true},
            {"id": 'no', "name": "No", 'checked': false}
        ]

        const radioListTreemapBorderClass_ptbr = [
            {"id": 'yes', "name": "Sim", 'checked': true},
            {"id": 'no', "name": "Não", 'checked': false}
        ]

        let formTreemapBorder = d3.select("#treemapBorder")
            .append("form")
            .attr('class', 'radioFormTreemapBorder')
            .append("div")
            .attr('id', 'formTreemapBorderDiv')
            .style("display", "flex")
            .style("flex-direction", "row")
            .style("justify-content", "space-around")
            .style("align-items", "center")

        let labelsTreemapBorder = formTreemapBorder
            .selectAll("label")
            .data(() => {
                if (language === 'en') {
                    if (treemapBorderValue === 'no') {
                        return radioListTreemapBorderError_en
                    } else {
                        return radioListTreemapBorderClass_en
                    }
                } else if (language === 'ptbr') {
                    if (treemapBorderValue === 'no') {
                        return radioListTreemapBorderError_ptbr
                    } else {
                        return radioListTreemapBorderClass_ptbr
                    }
                }
            }).enter()
            .append("label")
            .text((d) => d.name)
            .insert("input")
            .attr({
                type: "radio",
                class: "shape",
                name: "mode",
                value: (d) => d.id
            })
            .property("checked", (d) => d.checked)
            .on('click', (d) => {

                sessionStorage.setItem('treemapBorderValue', d.id)

                if (d.id === 'yes') {

                    lampEaggTreemap
                        .selectAll("rect")
                        .style("stroke", "gray")
                        .style("stroke-width", "0.3")

                    tsneEaggTreemap
                        .selectAll("rect")
                        .style("stroke", "gray")
                        .style("stroke-width", "0.3")

                } else {

                    datasetChangeselectValue = d3.select('.selectDataset').property('value')

                    colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

                    if (datasetChangeselectValue === 'iris') {

                        if (colorByChangeSelectValue === 'class') {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassIris(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassIris(d.data.class))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassIris(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassIris(d.data.class))

                        } else {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsLampIris(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsLampIris(d.data.error))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsTsneIris(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsTsneIris(d.data.error))
                        }

                    } else if (datasetChangeselectValue === 'segmentation') {

                        if (colorByChangeSelectValue === 'class') {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassSeg(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassSeg(d.data.class))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassSeg(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassSeg(d.data.class))

                        } else {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsLampSeg(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsLampSeg(d.data.error))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsTsneSeg(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        }

                    } else if (datasetChangeselectValue === 'concrete') {

                        if (colorByChangeSelectValue === 'class') {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassConcrete(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassSeg(d.data.class))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassConcrete(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassSeg(d.data.class))

                        } else {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsLampConcrete(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsLampSeg(d.data.error))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        }

                    } else if (datasetChangeselectValue === 'wine') {

                        if (colorByChangeSelectValue === 'class') {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassWine(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassSeg(d.data.class))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsClassWine(d.data.class))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsClassSeg(d.data.class))

                        } else {

                            lampEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsLampWine(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsLampSeg(d.data.error))

                            tsneEaggTreemap
                                .selectAll("rect")
                                .style("stroke", (d) => colorsTsneWine(d.data.error))
                                .style("stroke-width", borderTreemap)
                            // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        }
                    }
                }
            })

    }

    treemapBorder()

    function mouseoverLabel(){

        mouseoverLabelValue = sessionStorage.getItem('mouseoverLabelValue')

        const radioListMouseoverLabel_en = [
            {"id": 'yes', "name": "Yes", 'checked': true},
            {"id": 'no', "name": "No", 'checked': false}
        ]

        const radioListMouseoverLabel_ptbr = [
            {"id": 'yes', "name": "Sim", 'checked': true},
            {"id": 'no', "name": "Não", 'checked': false}
        ]

        let formMouseoverLabel = d3.select("#mouseoverLabel")
            .append("form")
            .attr('class', 'radioFormMouseoverLabel')
            .append("div")
            .attr('id', 'formMouseoverLabelDiv')
            .style("display", "flex")
            .style("flex-direction", "row")
            .style("justify-content", "space-around")
            .style("align-items", "center")

        let labelsMouseoverLabel = formMouseoverLabel
            .selectAll("label")
            .data(() => {
                if(language === 'en'){
                    return radioListMouseoverLabel_en
                } else if (language === 'ptbr') {
                    return radioListMouseoverLabel_ptbr
                }
            }).enter()
            .append("label")
            .text((d) => d.name)
            .insert("input")
            .attr({
                type: "radio",
                class: "shape",
                name: "mode",
                value: (d) => d.id
            })
            .property("checked", (d) => d.checked)
            .on('click', (d) => sessionStorage.setItem('mouseoverLabelValue', d.id))
    }

    mouseoverLabel()

    /*--------------------------------------------*/

    function mouseoverColor() {

        circleColorBrush = "#e66101"

        const radioListMouseoverColor = [

            {id: "pink", class: 'mouseoverColor', color: '#EF476F', 'checked': false},
            {id: "orange", class: 'mouseoverColor', color: '#fb8500', 'checked': true},
            {id: "yellow", class: 'mouseoverColor', color: '#FFD166', 'checked': false},
            {id: "green", class: 'mouseoverColor', color: '#06D6A0', 'checked': false},
            {id: "blue", class: 'mouseoverColor', color: '#118AB2', 'checked': false},
            {id: "midnight", class: 'mouseoverColor', color: '#073B4C', 'checked': false},
        ]

        let formMouseoverColor = d3.select("#mouseoverColor")
            .append("form")
            .attr('class', 'formMouseoverColor')
            .append("div")
            .attr('id', 'mouseoverColorDiv')
            .style("display", "flex")
            .style("flex-direction", "row")
            .style("justify-content", "space-around")
            .style("align-items", "center")

        let radioMouseoverColor = formMouseoverColor
            .selectAll(".myInput")
            .data(radioListMouseoverColor).enter()
            .append('span')
            .style("background", (d) => d.color)
            .style('width', 50 + 'px')
            .style('height', 30 + 'px')
            .insert("input")
            .attr({
                type: "radio",
                class: "shape",
                name: "mode",
                value: (d) => d.color
            })
            .property("checked", (d) => d.checked)
            .on('click', (d) => circleColorBrush = d.color)
    }

    mouseoverColor()

    /*--------------------------------------------*/

    function updateView(){

        pointsFalse = []
        intersectionPointsFalse = []

        pointsTrue = []
        intersectionPointsTrue = []

        pointsMissing = []
        intersectionPointsMissing = []

        tbody.selectAll("tr").remove();

        elementClass = []
        globalThis.selected = [];

        datasetChangeselectValue = d3.select('.selectDataset').property('value')
        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        if (datasetChangeselectValue === 'iris') {

            if (colorByChangeSelectValue === 'class') {

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassIris()
                sliderLampMp()
                legendClass(classesIris, nClassesIris, colorsClassIris)
                mp2ClassIris()
                sliderTsneMp()
                lampEaggTreemapIris()
                legendTreemap(corEaggIris)
                tsneEaggTreemapIris()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error'){

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorIris()
                mp2ErrorIris()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggIris)
                lampEaggTreemapIris()
                legendTreemap(corEaggIris)
                tsneEaggTreemapIris()
                criarPaletaError()

            } else if (colorByChangeSelectValue === 'distance'){

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[0].point)
                mp2DistancePreservation(files[1].point)
                legendDistance()

            }

        } else if (datasetChangeselectValue === 'segmentation') {

            if (colorByChangeSelectValue === 'class') {

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassSeg()
                mp2ClassSeg()
                sliderLampMp()
                sliderTsneMp()
                legendClass(classesSeg, nClassesSeg, colorsClassSeg)
                lampEaggTreemapSeg()
                legendTreemap(corEaggSeg)
                tsneEaggTreemapSeg()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error'){

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()
                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorSeg()
                mp2ErrorSeg()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggSeg)
                lampEaggTreemapSeg()
                legendTreemap(corEaggSeg)
                tsneEaggTreemapSeg()
                criarPaletaError()

            } else if (colorByChangeSelectValue === 'distance'){

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[3].point)
                mp2DistancePreservation(files[4].point)
                legendDistance()

            }

        } else if (datasetChangeselectValue === 'concrete') {

            if (colorByChangeSelectValue === 'class') {

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassConcrete()
                mp2ClassConcrete()
                sliderLampMp()
                sliderTsneMp()
                legendClass(classesConcrete, nClassesConcrete, colorsClassConcrete)
                lampEaggTreemapConcrete()
                legendTreemap(corEaggConcrete)
                tsneEaggTreemapConcrete()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error'){

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorConcrete()
                mp2ErrorConcrete()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggConcrete)
                lampEaggTreemapConcrete()
                legendTreemap(corEaggConcrete)
                tsneEaggTreemapConcrete()
                criarPaletaError()

            } else if (colorByChangeSelectValue === 'distance'){

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[6].point)
                mp2DistancePreservation(files[7].point)
                legendDistance()

            }

        } else if (datasetChangeselectValue === 'wine') {

            if (colorByChangeSelectValue === 'class') {

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassConcrete()
                mp2ClassConcrete()
                sliderLampMp()
                sliderTsneMp()
                legendClass(classesConcrete, nClassesConcrete, colorsClassWine)
                lampEaggTreemapWine()
                legendTreemap(corEaggWine)
                tsneEaggTreemapWine()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error'){

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorWine()
                mp2ErrorWine()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggWine)
                lampEaggTreemapWine()
                legendTreemap(corEaggWine)
                tsneEaggTreemapWine()
                criarPaletaError()

            } else if (colorByChangeSelectValue === 'distance'){

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[9].point)
                mp2DistancePreservation(files[10].point)
                legendDistance()

            }

        }
    }

    function chooseLanguage(){

        const radioListChooseLanguage_en = [
            {"id": 'en', "name": "English", 'checked': true},
            {"id": 'ptbr', "name": "Português BR", 'checked': false}
        ]

        const radioListChooseLanguage_ptbr = [
            {"id": 'en', "name": "English", 'checked': false},
            {"id": 'ptbr', "name": "Português BR", 'checked': true}
        ]

        let formChooseLanguage = d3.select("#language")
            .append("form")
            .attr('class', 'formChooseLanguage')
            .append("div")
            .attr('id', 'formChooseLanguageDiv')
            .style("display", "flex")
            .style("flex-direction", "row")
            .style("justify-content", "space-around")
            .style("align-items", "center")

        let labelsTreemapBorder = formChooseLanguage
            .selectAll("label")
            .data(() => {
                if(language === 'en'){
                    return radioListChooseLanguage_en
                } else if (language === 'ptbr') {
                    return radioListChooseLanguage_ptbr
                }
            }).enter()
            .append("label")
            .text((d) => d.name)
            .insert("input")
            .attr({
                type: "radio",
                class: "shape",
                name: "mode",
                value: (d) => d.id
            })
            .property("checked", (d) => d.checked)
            .on('click', (d) => {

                globalThis.language = d.id

                sessionStorage.setItem('chooseLanguageValue', d.id)

                if (d.id === 'en') {

                    updateView()

                } else if (d.id === 'ptbr'){

                    updateView()

                }
            })
    }

    chooseLanguage()


    /* dropdown dataset */

    function dropdownDataset(){

        const datasetListSegmentation=[
            {"id" : "segmentation", "name" : "Segmentation"},
            {"id" : 'iris', "name" : "Íris"},
            {"id" : 'concrete', "name" : "Wifi"},
            {"id" : 'wine', "name" : "Wine"}
        ]

        const datasetListIris=[
            {"id" : 'iris', "name" : "Íris"},
            {"id" : "segmentation", "name" : "Segmentation"},
            {"id" : 'concrete', "name" : "Wifi"},
            {"id" : 'wine', "name" : "Wine"}
        ]

        const datasetListConcrete=[
            {"id" : 'concrete', "name" : "Wifi"},
            {"id" : 'iris', "name" : "Íris"},
            {"id" : "segmentation", "name" : "Segmentation"},
            {"id" : 'wine', "name" : "Wine"}
        ]

        const datasetListWine=[
            {"id" : 'wine', "name" : "Wine"},
            {"id" : 'iris', "name" : "Íris"},
            {"id" : "segmentation", "name" : "Segmentation"},
            {"id" : 'concrete', "name" : "Wifi"}

        ]

        let selectDataset = d3.select('#dataset')
            .append('select')
            .attr('class','selectDataset')
            .on('change',changeDataset)

        let optionsDataset = selectDataset
            .selectAll('option')
            .data(()=>{
                if (datasetChangeselectValue === 'iris'){
                    return datasetListIris
                } else if (datasetChangeselectValue === 'segmentation'){
                    return datasetListSegmentation
                } else if (datasetChangeselectValue === 'concrete'){
                    return datasetListConcrete
                } else if (datasetChangeselectValue === 'wine'){
                    return datasetListWine
                }
            }).enter()
            .append('option')
            .attr("value", (d) => d.id)
            .text((d) => d.name)
            .style('font-size','15px')
    }

    dropdownDataset()

    function changeDataset(){

        sessionStorage.setItem('treemapBorderValue', 'no')
        colorByChangeSelectValue = 'error'
        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris'){

            d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,#tableBox,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

            linkedViewsError()
            utils()

            d3.select('#projMult01Rect').on('click', removeBrush)
            d3.select('#projMult02Rect').on('click', removeBrush)

            mp1ErrorIris()
            mp2ErrorIris()
            criarPaletaError()
            legendaEagg(corEaggIris)
            lampEaggTreemapIris()
            legendTreemap(corEaggIris)
            tsneEaggTreemapIris()
            sliderLampMp()
            sliderTsneMp()
            tableContent(files[2])

        } else if (datasetChangeselectValue === 'segmentation'){

            d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,#tableBox,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

            linkedViewsError()
            utils()

            d3.select('#projMult01Rect').on('click', removeBrush)
            d3.select('#projMult02Rect').on('click', removeBrush)

            mp1ErrorSeg()
            sliderLampMp()
            legendaEagg(corEaggSeg)
            mp2ErrorSeg()
            sliderTsneMp()
            lampEaggTreemapSeg()
            legendTreemap(corEaggSeg)
            tsneEaggTreemapSeg()
            criarPaletaError()
            tableContent(files[5])

        } else if (datasetChangeselectValue === 'concrete'){

            d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,#tableBox,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

            linkedViewsError()
            utils()

            d3.select('#projMult01Rect').on('click', removeBrush)
            d3.select('#projMult02Rect').on('click', removeBrush)

            mp1ErrorConcrete()
            sliderLampMp()
            legendaEagg(corEaggConcrete)
            mp2ErrorConcrete()
            sliderTsneMp()
            lampEaggTreemapConcrete()
            legendTreemap(corEaggConcrete)
            tsneEaggTreemapConcrete()
            criarPaletaError()
            tableContent(files[8])

        } else if (datasetChangeselectValue === 'wine'){

            d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,#tableBox,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

            linkedViewsError()
            utils()

            d3.select('#projMult01Rect').on('click', removeBrush)
            d3.select('#projMult02Rect').on('click', removeBrush)

            mp1ErrorWine()
            sliderLampMp()
            legendaEagg(corEaggWine)
            mp2ErrorWine()
            sliderTsneMp()
            lampEaggTreemapWine()
            legendTreemap(corEaggWine)
            tsneEaggTreemapWine()
            criarPaletaError()
            tableContent(files[11])

        }
    }

    /*--------------------------------------------*/

    /* color by */

    function colorBy(){

        const colorByListError_en=[
            {"id" : "error", "name" : "Aggregated Error"},
            {"id" : 'class', "name" : "Class"},
            {"id" : 'distance', "name" : "Distance Preservation"}
        ]

        const colorByListError_ptbr=[
            {"id" : "error", "name" : "Erro Agregado"},
            {"id" : 'class', "name" : "Classe"},
            {"id" : 'distance', "name" : "Preservação de Distância"}
        ]

        const colorByListClass_en=[
            {"id" : 'class', "name" : "Class"},
            {"id" : "error", "name" : "Aggregated Error"},
            {"id" : 'distance', "name" : "Distance Preservation"}
        ]

        const colorByListClass_ptbr=[
            {"id" : 'class', "name" : "Classe"},
            {"id" : "error", "name" : "Erro Agregado"},
            {"id" : 'distance', "name" : "Preservação de Distância"}
        ]

        const colorByListDistance_en=[
            {"id" : 'distance', "name" : "Distance Preservation"},
            {"id" : "error", "name" : "Aggregated Error"},
            {"id" : 'class', "name" : "Class"}
        ]

        const colorByListDistance_ptbr=[
            {"id" : 'distance', "name" : "Preservação de Distância"},
            {"id" : "error", "name" : "Erro Agregado"},
            {"id" : 'class', "name" : "Classe"}
        ]

        let selectColorBy = d3.select('#colorBy')
            .append('select')
            .attr('class','selectColorBy')
            .on('change',colorByChange)

        let optionsColorBy = selectColorBy
            .selectAll('option')
            .data(() => {
                if(language === 'en'){
                    if (colorByChangeSelectValue === 'error'){
                        return colorByListError_en
                    } else if (colorByChangeSelectValue === 'class'){
                        return colorByListClass_en
                    } else {
                        return colorByListDistance_en
                    }
                } else if (language === 'ptbr'){
                    if (colorByChangeSelectValue === 'error'){
                        return colorByListError_ptbr
                    } else if (colorByChangeSelectValue === 'class'){
                        return colorByListClass_ptbr
                    } else {
                        return colorByListDistance_ptbr
                    }
                }
            }).enter()
            .append('option')
            .attr('id', 'optionsColorBy')
            .attr("value", (d) => d.id)
            .text((d) => d.name)
            .style('font-size','15px')
    }

    colorBy()

    function colorByChange() {

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')
        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'segmentation'){

            if (colorByChangeSelectValue === 'class'){

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassSeg()
                mp2ClassSeg()
                sliderLampMp()
                sliderTsneMp()
                legendClass(classesSeg, nClassesSeg, colorsClassSeg)
                lampEaggTreemapSeg()
                legendTreemap(corEaggSeg)
                tsneEaggTreemapSeg()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error') {

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorSeg()
                mp2ErrorSeg()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggSeg)
                lampEaggTreemapSeg()
                legendTreemap(corEaggSeg)
                tsneEaggTreemapSeg()
                criarPaletaError()

            } else {

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[3].point)
                mp2DistancePreservation(files[4].point)
                legendDistance()

            }

        } else if (datasetChangeselectValue === 'iris'){

            if (colorByChangeSelectValue === 'class'){

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassIris()
                sliderLampMp()
                legendClass(classesIris, nClassesIris, colorsClassIris)
                mp2ClassIris()
                sliderTsneMp()
                lampEaggTreemapIris()
                legendTreemap(corEaggIris)
                tsneEaggTreemapIris()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error'){

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorIris()
                mp2ErrorIris()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggIris)
                lampEaggTreemapIris()
                legendTreemap(corEaggIris)
                tsneEaggTreemapIris()
                criarPaletaError()

            } else {

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[0].point)
                mp2DistancePreservation(files[1].point)
                legendDistance()

            }
        } else if (datasetChangeselectValue === 'concrete'){

            if (colorByChangeSelectValue === 'class') {

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassConcrete()
                mp2ClassConcrete()
                sliderLampMp()
                sliderTsneMp()
                legendClass(classesConcrete, nClassesConcrete, colorsClassConcrete)
                lampEaggTreemapConcrete()
                legendTreemap(corEaggConcrete)
                tsneEaggTreemapConcrete()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error') {

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorConcrete()
                mp2ErrorConcrete()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggConcrete)
                lampEaggTreemapConcrete()
                legendTreemap(corEaggConcrete)
                tsneEaggTreemapConcrete()
                criarPaletaError()

            } else {

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[6].point)
                mp2DistancePreservation(files[7].point)
                legendDistance()

            }

        } else if (datasetChangeselectValue === 'wine'){

            if (colorByChangeSelectValue === 'class') {

                sessionStorage.setItem('treemapBorderValue', 'yes')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsClass()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ClassWine()
                mp2ClassWine()
                sliderLampMp()
                sliderTsneMp()
                legendClass(classesWine, nClassesWine, colorsClassWine)
                lampEaggTreemapWine()
                legendTreemap(corEaggWine)
                tsneEaggTreemapWine()
                criaPaletaClasses()

            } else if (colorByChangeSelectValue === 'error') {

                sessionStorage.setItem('treemapBorderValue', 'no')

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsError()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1ErrorWine()
                mp2ErrorWine()
                sliderLampMp()
                sliderTsneMp()
                legendaEagg(corEaggWine)
                lampEaggTreemapWine()
                legendTreemap(corEaggWine)
                tsneEaggTreemapWine()
                criarPaletaError()

            } else {

                d3.selectAll("#viewport,#sideBarLeft,#sideBarRight,.tooltipClass,.tooltipError,.tooltipTreemap").remove()

                linkedViewsDistancePreservation()
                utils()
                d3.select('#projMult01Rect').on('click', removeBrush)
                d3.select('#projMult02Rect').on('click', removeBrush)
                mp1DistancePreservation(files[9].point)
                mp2DistancePreservation(files[10].point)
                legendDistance()

            }

        }
    }

    /*--------------------------------------------*/

    function sliderLampMp(){

        sliderLamp = d3v4.select('#sliderLampHtml')
            .append("div")
            .attr("id", "sliderLamp")
            .style("height", (18)+'px')
            .style("width", (mpWidth-50) +'px')
            .style('left', "15px")

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            d3.select('#sliderLamp')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeLampIris(minEaggLampIris))
                    .max(Math.round(normalizeLampIris(maxEaggLampIris)))
                    .step(0.1)
                    .value( [ normalizeLampIris(minEaggLampIris), Math.round(normalizeLampIris(maxEaggLampIris)) ] )
                    .on("slide", (evt, value) => sliderLampMpOnchange(value)))

        } else if (datasetChangeselectValue === 'segmentation') {

            d3.select('#sliderLamp')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeLampSeg(minEaggLampSeg))
                    .max(Math.round(normalizeLampSeg(maxEaggLampSeg)))
                    .step(0.1)
                    .value( [ normalizeLampSeg(minEaggLampSeg), Math.round(normalizeLampSeg(maxEaggLampSeg)) ] )
                    .on("slide", (evt, value) => sliderLampMpOnchange(value)))

        } else if (datasetChangeselectValue === 'concrete') {

            d3.select('#sliderLamp')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeLampConcrete(minEaggLampConcrete))
                    .max(Math.round(normalizeLampConcrete(maxEaggLampConcrete)))
                    .step(0.1)
                    .value([normalizeLampConcrete(minEaggLampConcrete), Math.round(normalizeLampConcrete(maxEaggLampConcrete))])
                    .on("slide", (evt, value) => sliderLampMpOnchange(value)))

        } else if (datasetChangeselectValue === 'wine') {

            d3.select('#sliderLamp')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeLampWine(minEaggLampWine))
                    .max(Math.round(normalizeLampWine(maxEaggLampWine)))
                    .step(0.1)
                    .value([normalizeLampWine(minEaggLampWine), Math.round(normalizeLampWine(maxEaggLampWine))])
                    .on("slide", (evt, value) => sliderLampMpOnchange(value)))

        }
    }

    function sliderLampMpOnchange(value){

        globalThis.selected=[]

        projMult01.selectAll("circle").style("opacity", '0.1')
        lampEaggTreemap.selectAll("rect").style("opacity", '0.1')

        // projMult02.selectAll("circle").style("opacity", '1')
        // tsneEaggTreemap.selectAll("rect").style("opacity", '1')

        tbody.selectAll("tr").remove();

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            files[0].point.filter((d) => {
                if ((normalizeLampIris(d.eagg) >= value[0]) && (normalizeLampIris(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult01.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
                // .on('mouseout',mouseoutSliderLamp)

            lampEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapLamp"+d))
                .style("opacity", '1')
                // .on('mouseout', mouseoutSliderLampTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderLamp)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderLamp)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)

            visaotabularSliderSegLamp(globalThis.selected)

        } else if (datasetChangeselectValue === 'segmentation') {

            files[3].point.filter((d) => {
                if ((normalizeLampSeg(d.eagg) >= value[0]) && (normalizeLampSeg(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult01.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
                // .on('mouseout',mouseoutSliderLamp)

            lampEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapLamp"+d))
                .style("opacity", '1')
                // .on('mouseout', mouseoutSliderLampTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderLamp)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderLamp)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)

            visaotabularSliderSegLamp(globalThis.selected)

        } else if (datasetChangeselectValue === 'concrete') {

            files[6].point.filter((d) => {
                if ((normalizeLampConcrete(d.eagg) >= value[0]) && (normalizeLampConcrete(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult01.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
            // .on('mouseout',mouseoutSliderLamp)

            lampEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapLamp"+d))
                .style("opacity", '1')
            // .on('mouseout', mouseoutSliderLampTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderLamp)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderLamp)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)

            visaotabularSliderConcreteLamp(globalThis.selected)

        } else if (datasetChangeselectValue === 'wine') {

            files[9].point.filter((d) => {
                if ((normalizeLampWine(d.eagg) >= value[0]) && (normalizeLampWine(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult01.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
            // .on('mouseout',mouseoutSliderLamp)

            lampEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapLamp"+d))
                .style("opacity", '1')
            // .on('mouseout', mouseoutSliderLampTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderLamp)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderLamp)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderLampTreemap)

            visaotabularSliderWineLamp(globalThis.selected)

        }
    }

    /*--------------------------------------------*/

    function sliderTsneMp() {

        sliderTsne = d3v4.select('#sliderTsneHtml')
            .append("div")
            .attr("id", "sliderTsne")
            .style("height", (18)+'px')
            .style("width", (mpWidth-50) +'px')
            .style('left', "15px")

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            d3.select('#sliderTsne')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeTsneIris(minEaggTsneIris))
                    .max(normalizeTsneIris(maxEaggTsneIris))
                    .step(0.1)
                    .value( [ normalizeTsneIris(minEaggTsneIris), normalizeTsneIris(maxEaggTsneIris) ] )
                    .on("slide", (evt, value) => sliderTsneMpOnchange(value)))

        } else if (datasetChangeselectValue === 'segmentation') {

            d3.select('#sliderTsne')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeTsneSeg(minEaggTsneSeg))
                    .max(normalizeTsneSeg(maxEaggTsneSeg))
                    .step(0.1)
                    .value( [ normalizeTsneSeg(minEaggTsneSeg), normalizeTsneSeg(maxEaggTsneSeg) ] )
                    .on("slide", (evt, value) => sliderTsneMpOnchange(value)))

        } else if (datasetChangeselectValue === 'concrete') {

            d3.select('#sliderTsne')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeTsneConcrete(minEaggTsneConcrete))
                    .max(normalizeTsneConcrete(maxEaggTsneConcrete))
                    .step(0.1)
                    .value( [ normalizeTsneConcrete(minEaggTsneConcrete), normalizeTsneConcrete(maxEaggTsneConcrete) ] )
                    .on("slide", (evt, value) => sliderTsneMpOnchange(value)))

        } else if (datasetChangeselectValue === 'wine') {

            d3.select('#sliderTsne')
                .call(d3.slider()
                    .axis(d3.svg.axis().orient("botton").ticks(11))
                    .min(normalizeTsneWine(minEaggTsneWine))
                    .max(normalizeTsneWine(maxEaggTsneWine))
                    .step(0.1)
                    .value( [ normalizeTsneWine(minEaggTsneWine), normalizeTsneWine(maxEaggTsneWine) ] )
                    .on("slide", (evt, value) => sliderTsneMpOnchange(value)))

        }
    }

    function sliderTsneMpOnchange(value){

        globalThis.selected = []

        // projMult01.selectAll("circle").style("opacity", circleOpacity)
        // lampEaggTreemap.selectAll("rect").style("opacity", '1')

        projMult02.selectAll("circle").style("opacity", '0.1')

        tbody.selectAll("tr").remove();

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris'){

            tsneEaggTreemap.selectAll(".tsneTreemapIris").style("opacity", '0.1')

            files[1].point.filter((d) => {

                if ((normalizeTsneIris(d.eagg) >= value[0]) && (normalizeTsneIris(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult02.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
                // .on('mouseout',mouseoutSliderTsne)

            tsneEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapTsne"+d))
                .style("opacity", '1')
                // .on('mouseout', mouseoutSliderTsneTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderTsne)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderTsne)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)

            visaotabularSliderIrisTsne(globalThis.selected)

        } else if (datasetChangeselectValue === 'segmentation') {

            tsneEaggTreemap.selectAll(".tsneTreemapSeg").style("opacity", '0.1')

            files[4].point.filter((d) => {

                if ((normalizeTsneSeg(d.eagg) >= value[0]) && (normalizeTsneSeg(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult02.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
                // .on('mouseout',mouseoutSliderTsne)

            tsneEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapTsne"+d))
                .style("opacity", '1')
                // .on('mouseout', mouseoutSliderTsneTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderTsne)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderTsne)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)

            visaotabularSliderSegTsne(globalThis.selected)

        } else if (datasetChangeselectValue === 'concrete') {

            tsneEaggTreemap.selectAll(".tsneTreemapConcrete").style("opacity", '0.1')

            files[7].point.filter((d) => {
                if ((normalizeTsneConcrete(d.eagg) >= value[0]) && (normalizeTsneConcrete(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult02.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
            // .on('mouseout',mouseoutSliderTsne)

            tsneEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapTsne"+d))
                .style("opacity", '1')
            // .on('mouseout', mouseoutSliderTsneTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderTsne)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderTsne)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)

            visaotabularSliderConcreteTsne(globalThis.selected)

        } else if (datasetChangeselectValue === 'wine') {

            tsneEaggTreemap.selectAll(".tsneTreemapWine").style("opacity", '0.1')

            files[10].point.filter((d) => {
                if ((normalizeTsneWine(d.eagg) >= value[0]) && (normalizeTsneWine(d.eagg) <= value[1])){
                    return globalThis.selected.push(d.id)
                }
            })

            projMult02.selectAll(globalThis.selected.map((d) => ".pt"+d))
                .style("opacity", circleOpacity)
            // .on('mouseout',mouseoutSliderTsne)

            tsneEaggTreemap.selectAll(globalThis.selected.map((d) => "#treemapTsne"+d))
                .style("opacity", '1')
            // .on('mouseout', mouseoutSliderTsneTreemap)

            projMult01.selectAll("circle").on('mouseout', mouseoutSliderTsne)
            projMult02.selectAll("circle").on('mouseout', mouseoutSliderTsne)

            lampEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)
            tsneEaggTreemap.selectAll("rect").on('mouseout', mouseoutSliderTsneTreemap)

            visaotabularSliderWineTsne(globalThis.selected)

        }
    }

    /*--------------------------------------------*/

    /* paleta de cores classes */

    function criaPaletaClasses() {

        let datasetChangeselectValue = d3.select('.selectDataset').property('value')

        let n_class

        if (datasetChangeselectValue === 'iris') {
            n_class = nClassesIris
        } else if (datasetChangeselectValue === 'segmentation') {
            n_class = nClassesSeg
        } else if (datasetChangeselectValue === 'concrete') {
            n_class = nClassesConcrete
        } else if (datasetChangeselectValue === 'wine') {
            n_class = nClassesWine
        }

        const palletes = [
            {id: "Set1", class: 'paleta', color: colorbrewer.Set1[n_class]},
            {id: "Set2", class: 'paleta', color: colorbrewer.Set2[n_class]},
            {id: "Set3", class: 'paleta', color: colorbrewer.Set3[n_class]},
            {id: "Accent", class: 'paleta', color: colorbrewer.Accent[n_class]},
            {id: "Paired", class: 'paleta', color: colorbrewer.Paired[n_class]},
            {id: "BrBG", class: 'paleta', color: colorbrewer.BrBG[n_class]},
            {id: "RdYlBu", class: 'paleta', color: colorbrewer.RdYlBu[n_class]},
            {id: "Dark2", class: 'paleta', color: colorbrewer.Dark2[n_class]}
        ]
        let colorPaletteBoxClass = d3v4.select("#dropdown")
            .append("div")
            .attr("class","colorPaletteBoxClass")

        let colorPaletteSelectClass = colorPaletteBoxClass
            .append("div")
            .attr("class","colorPaletteSelectClass")
            .style("width", 170+'px')
            .style('height', 15 + 'px')
            .append('text')
            .text(() => {
                if(language === 'en'){
                    return 'Select Color Palette'
                } else if (language === 'ptbr') {
                    return 'Selecione uma Paleta de Cores'
                }
            })

        let colorPaletteDropdownClass = colorPaletteBoxClass
            .append("div")
            .attr("class","colorPaletteDropdownClass")

        colorPaletteDropdownClass
            .selectAll('.colorPaletteDropdownClass')
            .data(palletes).enter()
            .append("div")
            .attr("id", (d) => d.id)
            .attr("class", 'palette')
            .style("width", 170+'px')
            .style('height', 15 + 'px')
            .append("svg")
            .attr("class","colorPaletteOptionSvgClass")
            .style("height", (15) + 'px')
            .style("width", 170+'px')
            .selectAll('rect')
            .data((d) => d.color).enter()
            .insert('rect')
            .style('width', 15 + 'px')
            .style('height', 15 + 'px')
            .style('fill', (d) => d)
            .attr("x", (d, i) => (15*i))

        d3.selectAll('.palette')
            .append('text')
            .text((d)=> d.id)

        d3.selectAll('.palette').on('click', (e) => {

            d3.select('.colorPaletteSelectClass').selectAll('*').remove()

            d3.selectAll('.colorPaletteSelectClass')
                .append("svg")
                .attr("class","colorPaletteSelectSvgClass")
                .style("height", (15) + 'px')
                .style("width", 170+'px')
                .selectAll('rect')
                .data(e.color).enter()
                .insert('rect')
                .style('width', 15 + 'px')
                .style('height', 15 + 'px')
                .style('fill', (d) => d)
                .attr("x", (d, i) => (15*i))

            d3.selectAll('.colorPaletteSelectClass')
                .append('text')
                .text(()=> e.id)

            colorsChangeClass(e.color)
        })

    }

    function colorsChangeClass(colors) {

        if (datasetChangeselectValue === 'segmentation'){

            corClassesSeg = colors

            d3.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassSeg(d.class))

            projMultLegend.selectAll("rect")
                .transition()
                .duration(100)
                .style("fill", (d) => colorsClassSeg(d))

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassSeg(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassSeg(d.data.class))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassSeg(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassSeg(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassSeg(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassSeg(d.data.class))

            }

        } else if (datasetChangeselectValue === 'iris'){

            corClassesIris = colors

            d3.selectAll("circle")
                .transition()
                .duration(100)
                // .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassIris(d.class))
                // .style("opacity", circleOpacity);

            projMultLegend.selectAll("rect")
                .transition()
                .duration(100)
                .style("fill", (d) => colorsClassIris(d))

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassIris(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassIris(d.data.class))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassIris(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassIris(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassIris(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassIris(d.data.class))

            }

        } else if (datasetChangeselectValue === 'concrete'){

            corClassesConcrete = colors

            d3.selectAll("circle")
                .transition()
                .duration(100)
                // .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassConcrete(d.class))
            // .style("opacity", circleOpacity);

            projMultLegend.selectAll("rect")
                .transition()
                .duration(100)
                .style("fill", (d) => colorsClassConcrete(d))

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassConcrete(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassConcrete(d.data.class))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassConcrete(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassConcrete(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassConcrete(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassConcrete(d.data.class))

            }

        } else if (datasetChangeselectValue === 'wine'){

            corClassesWine = colors

            d3.selectAll("circle")
                .transition()
                .duration(100)
                // .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassWine(d.class))
            // .style("opacity", circleOpacity);

            projMultLegend.selectAll("rect")
                .transition()
                .duration(100)
                .style("fill", (d) => colorsClassWine(d))

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassWine(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsClassWine(d.data.class))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassWine(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassWine(d.data.class))

                tsneEaggTreemap
                    .selectAll("rect")
                    .transition()
                    .duration(100)
                    .style("stroke", (d) => colorsClassWine(d.data.class))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsClassWine(d.data.class))

            }

        }
    }

    /*--------------------------------------------*/

    /* paleta de cores error */

    function criarPaletaError() {

        const palletes = [

            {id: "Blues", class: 'paleta', color: colorbrewer.SequentialSingleHue['Blues']},
            {id: "Greens", class: 'paleta', color: colorbrewer.SequentialSingleHue['Greens']},
            {id: "Greys", class: 'paleta', color: colorbrewer.SequentialSingleHue['Greys']},
            {id: "Oranges", class: 'paleta', color: colorbrewer.SequentialSingleHue['Oranges']},
            {id: "Purples", class: 'paleta', color: colorbrewer.SequentialSingleHue['Purples']},
            {id: "Reds", class: 'paleta', color: colorbrewer.SequentialSingleHue['Reds']},
            {id: "BuGn", class: 'paleta', color: colorbrewer.SequentialMultiHue['BuGn']},
            {id: "BuPu", class: 'paleta', color: colorbrewer.SequentialMultiHue['BuPu']},
            {id: "GnBu", class: 'paleta', color: colorbrewer.SequentialMultiHue['GnBu']},
            {id: "OrRd", class: 'paleta', color: colorbrewer.SequentialMultiHue['OrRd']},
            {id: "PuBuGn", class: 'paleta', color: colorbrewer.SequentialMultiHue['PuBuGn']},
            {id: "PuBu", class: 'paleta', color: colorbrewer.SequentialMultiHue['PuBu']},
            {id: "PuRd", class: 'paleta', color: colorbrewer.SequentialMultiHue['PuRd']},
            {id: "RdPu", class: 'paleta', color: colorbrewer.SequentialMultiHue['RdPu']},
            {id: "YlGnBu", class: 'paleta', color: colorbrewer.SequentialMultiHue['YlGnBu']},
            {id: "YlGn", class: 'paleta', color: colorbrewer.SequentialMultiHue['YlGn']},
            {id: "YlOrBr", class: 'paleta', color: colorbrewer.SequentialMultiHue['YlOrBr']},
            {id: "YlOrRd", class: 'paleta', color: colorbrewer.SequentialMultiHue['YlOrRd']}
        ]

        let colorPaletteBox = d3v4.select("#dropdown")
            .append("svg")
            .attr("id","colorPaletteBox")
            .style("height", (30*20) + 'px')
            .style("width", 250+'px')

        let colorPaletteDropdown = colorPaletteBox
            .append("g")
            .attr("id","colorPaletteDropdown")
            .attr("class","colorPaletteDropdown")

        let colorPaletteSelect = colorPaletteDropdown
            .append("g")
            .attr("id","colorPaletteSelect")
            .attr("class","select")

        colorPaletteSelect
            .append("rect")
            .attr("id","colorPaletteSelectRect")
            .attr("x", 0)
            .attr("y",  10)
            .attr("width", 250)
            .attr("height", 30)

        colorPaletteSelect
            .append("text")
            .attr("x", 10)
            .attr("y",30)
            .attr("id","colorPaletteSelectText")
            .text(() => {
                if(language === 'en'){
                    return 'Select Color Palette'
                } else if (language === 'ptbr') {
                    return 'Selecione uma Paleta de Cor'
                }
            })

        d3v4.range(palletes.length - 1).map((i) => {

            colorPaletteDropdown
                .append("g")
                .attr("id", `${palletes[i].id}`)
                .attr("class", 'colorPaletteOptions')
                .on("click", function() {

                    let elem = this.getElementsByTagName("text")[0].innerHTML
                    document.getElementById("colorPaletteSelectText").innerHTML = elem
                    colorPaletteSelect.selectAll('rect').style("fill", `url(#${elem}_grad)`)
                    colorsChangeError(palletes.find((d) => {if(d.id === elem) {return d.color}}).color)
                    // d3.event.stopPropagation();
                    // d3.selectAll('.colorPaletteOption').style("display", "none")
                })

            d3v4.select(`#${palletes[i].id}`)
                .append("defs")
                .append("linearGradient")
                .attr("id", `${palletes[i].id}_grad`)
                .selectAll(".myStop")
                .data((palletes[i].color)).enter()
                .append("stop")
                .attr('offset', (d, z) => ((z / (palletes[i].color.length - 1)) * 100) + '%')
                .attr("stop-color", d => d)

            d3v4.select(`#${palletes[i].id}`)
                .append("rect")
                .attr('id', `${palletes[i].id}_option`)
                .attr('class', 'colorPaletteOption')
                .attr("x", 0)
                .attr("y", (40 + i*30))
                .attr("width", 250)
                .attr("height", 30)
                .style("fill", `url(#${palletes[i].id}_grad)`)
                .style("margin-left", '15px')

            d3v4.select(`#${palletes[i].id}`)
                .append("text")
                .attr("x", 10)
                .attr("y", (60 + i*30))
                .text(`${palletes[i].id}`)
        })
    }

    function colorsChangeError(colors) {

        if (datasetChangeselectValue === 'segmentation'){

            corEaggSeg = colors

            projMult01.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampSeg(d.eagg))

            projMult02.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneSeg(d.eagg))

            grad.selectAll('stop')
                .data(colors)
                .style('stop-color', (d) => d)
                .attr('offset', (d, i) => ((i / (colors.length - 1)) * 100)+'%')

            projMultLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', 'url(#grad)')

            linearGradient.selectAll('stop')
                .data(colors)
                .attr('offset', (d, i) => ((i / (colors.length - 1)) * 100)+'%')
                .attr('stop-color', (d) => d)

            treemapLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', "url(#linearGradient)")

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsLampSeg(files[3].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsTsneSeg(files[4].point[d.data.name].eagg))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsLampSeg(files[3].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsLampSeg(files[3].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsTsneSeg(files[4].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsTsneSeg(files[4].point[d.data.name].eagg))
            }

        } else if (datasetChangeselectValue === 'iris'){

            corEaggIris = colors

            projMult01.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampIris(d.eagg))

            projMult02.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneIris(d.eagg))

            grad.selectAll('stop')
                .data(colors)
                .style('stop-color', (d) => d)
                .attr('offset', (d, i) => ((i / (colors.length - 1)) * 100) + '%')

            projMultLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', 'url(#grad)')

            linearGradient.selectAll('stop')
                .data(colors)
                .attr('offset', (d, i) => (i / (colors.length - 1)) * 100 + '%')
                .attr('stop-color', (d) => d)

            treemapLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', "url(#linearGradient)")

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsLampIris(d.data.error))
                    // .style("fill", (d) => colorsLampIris(files[0].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsTsneIris(d.data.error))
                    // .style("fill", (d) => colorsTsneIris(files[1].point[d.data.name].eagg))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsLampIris(d.data.error))
                    // .style("stroke", (d) => colorsLampIris(files[0].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsLampIris(d.data.error))
                    // .style("fill", (d) => colorsLampIris(files[0].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsTsneIris(d.data.error))
                    // .style("stroke", (d) => colorsTsneIris(files[1].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsTsneIris(d.data.error))
                    // .style("fill", (d) => colorsTsneIris(files[1].point[d.data.name].eagg))
            }

        } else if (datasetChangeselectValue === 'concrete'){

            corEaggConcrete = colors

            projMult01.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampConcrete(d.eagg))

            projMult02.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneConcrete(d.eagg))

            grad.selectAll('stop')
                .data(colors)
                .style('stop-color', (d) => d)
                .attr('offset', (d, i) => ((i / (colors.length - 1)) * 100)+'%')

            projMultLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', 'url(#grad)')

            linearGradient.selectAll('stop')
                .data(colors)
                .attr('offset', (d, i) => ((i / (colors.length - 1)) * 100)+'%')
                .attr('stop-color', (d) => d)

            treemapLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', "url(#linearGradient)")

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsLampConcrete(files[6].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsTsneConcrete(files[7].point[d.data.name].eagg))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsLampConcrete(files[6].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsLampConcrete(files[6].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsTsneConcrete(files[7].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsTsneConcrete(files[7].point[d.data.name].eagg))
            }

        } else if (datasetChangeselectValue === 'wine'){

            corEaggWine = colors

            projMult01.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampWine(d.eagg))

            projMult02.selectAll("circle")
                .transition()
                .duration(100)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneWine(d.eagg))

            grad.selectAll('stop')
                .data(colors)
                .style('stop-color', (d) => d)
                .attr('offset', (d, i) => ((i / (colors.length - 1)) * 100)+'%')

            projMultLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', 'url(#grad)')

            linearGradient.selectAll('stop')
                .data(colors)
                .attr('offset', (d, i) => ((i / (colors.length - 1)) * 100)+'%')
                .attr('stop-color', (d) => d)

            treemapLegend.append('rect')
                .transition()
                .duration(100)
                .style('fill', "url(#linearGradient)")

            let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsLampWine(files[9].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", "gray")
                    .style("stroke-width", "0.3")
                    .style("fill", (d) => colorsTsneWine(files[10].point[d.data.name].eagg))

            } else{

                lampEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsLampWine(files[9].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsLampWine(files[9].point[d.data.name].eagg))

                tsneEaggTreemap
                    .selectAll("rect")
                    .style("stroke", (d) => colorsTsneWine(files[10].point[d.data.name].eagg))
                    .style("stroke-width", borderTreemap)
                    .style("fill", (d) => colorsTsneWine(files[10].point[d.data.name].eagg))
            }

        }
    }

    /*--------------------------------------------*/

    elementClass = []

    const clickClass = (d) => {

        let elementoIndice = elementClass.indexOf(d);

        if (elementoIndice === -1) {

            elementClass.push(d);

            projMult01.selectAll("circle")
                .filter(e => e.class === d)
                .style("opacity", 0.1)

            projMult02.selectAll("circle")
                .filter(e => e.class === d)
                .style("opacity", 0.1)

            projMultLegend.select("#class"+d)
                .attr("fill-opacity", 0.2)

            lampEaggTreemap.selectAll("rect")
                .filter(e => e.data.class === d)
                .style("opacity", 0.2)

            tsneEaggTreemap.selectAll("rect")
                .filter(e => e.data.class === d)
                .style("opacity", 0.2)

        } else {

            elementClass.splice(elementoIndice, 1 );

            projMult01.selectAll("circle")
                .filter(e => e.class === d)
                .style("opacity", circleOpacity)

            projMult02.selectAll("circle")
                .filter(e => e.class === d)
                .style("opacity", circleOpacity)

            projMultLegend.select("#class"+d)
                .attr("fill-opacity", circleOpacity)

            lampEaggTreemap.selectAll("rect")
                .filter(e => e.data.class === d)
                .style("opacity", '1')

            tsneEaggTreemap.selectAll("rect")
                .filter(e => e.data.class === d)
                .style("opacity", '1')
        }
    }

    let mouseoverClass = (d) => {

        if(sessionStorage.getItem('mouseoverLabelValue') === 'yes'){
            divClass.transition().duration(100).style("opacity", circleOpacity)
        }

        sliderLampCircleOpacity = window.getComputedStyle(document.querySelector('#ptLamp'+d.id)).getPropertyValue("opacity")
        sliderTsneCircleOpacity = window.getComputedStyle(document.querySelector('#ptTsne'+d.id)).getPropertyValue("opacity")
        sliderLampTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapLamp'+d.id)).getPropertyValue("opacity")
        sliderTsneTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapTsne'+d.id)).getPropertyValue("opacity")

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        d3v4.selectAll(".pt"+d.id).raise();
        highlightedCircleClick(d.id);
        highlightedTreemapClick(d.id)
        visaoTabularMouseover(d.id)

        if(language === 'en'){
            divClass.html("Id: " + (d.id) + "<br/>" + "Class: " + d.class)
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 50) + "px")
        } else if (language === 'ptbr') {
            divClass.html("Id: " + (d.id) + "<br/>" + "Classe: " + d.class)
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 50) + "px")
        }

    }

    let mouseoutClass = (d) => {

        divClass.transition()
            .duration(100)
            .style("opacity", 0);

        if (globalThis.selected.indexOf(d.id) === -1) {

            if(elementClass.indexOf(d.class) === -1){

                unhighlightedTreemapClick(d)

                datasetChangeselectValue = d3.select('.selectDataset').property('value')

                if (datasetChangeselectValue === 'iris') {

                    d3v4.selectAll("#tr"+(d.id)).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", circleOpacity)

                } else if (datasetChangeselectValue === 'segmentation') {

                    d3v4.selectAll("#tr"+d.id).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", circleOpacity)

                } else if (datasetChangeselectValue === 'concrete') {

                    d3v4.selectAll("#tr"+d.id).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'wine') {

                    d3v4.selectAll("#tr"+d.id).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", circleOpacity)

                }

            } else{

                unhighlightedTreemapClick(d)

                datasetChangeselectValue = d3.select('.selectDataset').property('value')

                if (datasetChangeselectValue === 'iris') {

                    d3v4.selectAll("#tr"+(d.id)).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", 0.1)

                } else if (datasetChangeselectValue === 'segmentation') {

                    d3v4.selectAll("#tr"+d.id).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", 0.1)

                } else if (datasetChangeselectValue === 'concrete') {

                    d3v4.selectAll("#tr"+d.id).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", 0.1)

                } else if (datasetChangeselectValue === 'wine') {

                    d3v4.selectAll("#tr"+d.id).remove();

                    d3.selectAll(".pt"+d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", 0.1)

                }

            }
        }
    }

    /*--------------------------------------------*/

    function utils(){

        circleOpacity = 0.9

        dropdownDataset()

        sizeCircleMp()

        backgroundPm()

        transparencyCircleMp()

        treemapBorder()

        mouseoverColor()

        colorBy()

        datasetInfo_()

        mouseoverLabel()

        chooseLanguage()
        
    }

    /*--------------------------------------------*/

    let mouseoverTableView = (d) => {

        d3v4.selectAll(".pt"+d).raise()

        sliderLampCircleOpacity = window.getComputedStyle(document.querySelector('#ptLamp'+d)).getPropertyValue("opacity")
        sliderTsneCircleOpacity = window.getComputedStyle(document.querySelector('#ptTsne'+d)).getPropertyValue("opacity")
        sliderLampTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapLamp'+d)).getPropertyValue("opacity")
        sliderTsneTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapTsne'+d)).getPropertyValue("opacity")

        d3.selectAll(".pt"+d)
            .attr('r', rBrush+2)
            .style("fill", 'red')
            .style("stroke", corBorda)
            .style("opacity", circleOpacity)

        d3.selectAll("#treemapLamp"+d)
            .style("stroke", "red")
            .style("stroke-width", 3)

        d3.selectAll("#treemapTsne"+d)
            .style("stroke", "red")
            .style("stroke-width", 3)
    }

    let mouseoutTableView = (d) => {

        projMult01.selectAll(".pt"+d)
            .attr('r', rBrush)
            .style("fill", circleColorBrush)
            .style("stroke", corBorda)
            .style("opacity", `${sliderLampCircleOpacity}`)

        projMult02.selectAll(".pt"+d)
            .attr('r', rBrush)
            .style("fill", circleColorBrush)
            .style("stroke", corBorda)
            .style("opacity", `${sliderTsneCircleOpacity}`)

        lampEaggTreemap.selectAll("#treemapLamp"+d)
            .style("stroke", circleColorBrush)
            .style("stroke-width", 2)

        tsneEaggTreemap.selectAll("#treemapTsne"+d)
            .style("stroke", circleColorBrush)
            .style("stroke-width", 2)
    }

    let mouseoutTableViewSlider = (d) => {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

        if (globalThis.selected.indexOf(d) === -1){

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap.selectAll("#treemapLamp" + d)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderLampTreemapOpacity}`)

                tsneEaggTreemap.selectAll("#treemapTsne" + d)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderTsneTreemapOpacity}`)
            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            }

        } else {

            // padrao / op 0.9

            if (treemapBorderValue === 'yes'){

                d3.selectAll("#treemapLamp" + d)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderLampTreemapOpacity}`)

                d3.selectAll("#treemapTsne" + d)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderTsneTreemapOpacity}`)

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (e) => colorsLampSeg(e.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (e) => colorsTsneSeg(e.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (e) => colorsLampConcrete(e.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (e) => colorsTsneConcrete(e.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    projMult01.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (e) => colorsLampWine(e.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (e) => colorsTsneWine(e.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            }
        }
    }

    /*--------------------------------------------*/

    let mouseoverError = (d) => {

        if(sessionStorage.getItem('mouseoverLabelValue') === 'yes'){
            divError.transition().duration(100).style("opacity", circleOpacity)
        }

        sliderLampCircleOpacity = window.getComputedStyle(document.querySelector('#ptLamp'+d.id)).getPropertyValue("opacity")
        sliderTsneCircleOpacity = window.getComputedStyle(document.querySelector('#ptTsne'+d.id)).getPropertyValue("opacity")
        sliderLampTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapLamp'+d.id)).getPropertyValue("opacity")
        sliderTsneTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapTsne'+d.id)).getPropertyValue("opacity")

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        d3v4.selectAll(".pt"+d.id).raise();

        if(language === 'en'){

            divError.html("Id: " + (d.id) + "<br/>" + "Error: " + d.eagg.toFixed(2))
                .style("left", (d3.event.pageX - 120) + "px")
                .style("top", (d3.event.pageY - 55) + "px")

        } else if (language === 'ptbr') {

            divError.html("Id: " + (d.id) + "<br/>" + "Erro: " + d.eagg.toFixed(2))
                .style("left", (d3.event.pageX - 120) + "px")
                .style("top", (d3.event.pageY - 55) + "px")
        }

        highlightedCircleClick(d.id)
        highlightedTreemapClick(d.id)
        visaoTabularMouseover(d.id)

    }

    let mouseoutError = (d) => {

        divError.transition().duration(100).style("opacity", 0);

        if (globalThis.selected.indexOf(d.id) === -1){

            unhighlightedTreemapClick(d)

            datasetChangeselectValue = d3.select('.selectDataset').property('value')

            if (datasetChangeselectValue === 'iris') {

                d3v4.selectAll("#tr"+(d.id)).remove();

                projMult01.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsLampIris(d.eagg))
                    .style("opacity", circleOpacity)

                projMult02.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsTsneIris(d.eagg))
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'segmentation') {

                d3v4.selectAll("#tr" + d.id).remove();

                projMult01.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsLampSeg(d.eagg))
                    .style("opacity", circleOpacity)

                projMult02.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsTsneSeg(d.eagg))
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'concrete') {

                d3v4.selectAll("#tr" + d.id).remove();

                projMult01.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsLampConcrete(d.eagg))
                    .style("opacity", circleOpacity)

                projMult02.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsTsneConcrete(d.eagg))
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'wine') {

                d3v4.selectAll("#tr" + d.id).remove();

                projMult01.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsLampWine(d.eagg))
                    .style("opacity", circleOpacity)

                projMult02.selectAll(".pt" + d.id)
                    .transition()
                    .duration(100)
                    .attr("r", rPadrao)
                    .style("stroke", corBorda)
                    .style("fill", (d) => colorsTsneWine(d.eagg))
                    .style("opacity", circleOpacity)

            }
        }
    }

    /*--------------------------------------------*/

    let mouseoverDistance = (d) => {

        if(sessionStorage.getItem('mouseoverLabelValue') === 'yes'){
            divClass.transition().duration(100).style("opacity", '1')
        }

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        const colorsFalse = colorbrewer.Oranges[4]
        const colorsTrue = '#f7f7f7'
        const colorsMissing = colorbrewer.Purples[4]

        const valueFTM = -0.10

        d3v4.selectAll(".pt"+d.id).raise()

        if(language === 'en'){

            divClass.html("Id: " + (d.id) + "<br/>" + "Class: " + d.class)
                .style("left", (d3.event.pageX - 120) + "px")
                .style("top", (d3.event.pageY - 65) + "px")

        } else if (language === 'ptbr') {

            divClass.html("Id: " + (d.id) + "<br/>" + "Classe: " + d.class)
                .style("left", (d3.event.pageX - 120) + "px")
                .style("top", (d3.event.pageY - 65) + "px")
        }

        visaoTabularMouseover(d.id);

        if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length < '1')){

            if (datasetChangeselectValue === 'iris') {

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampIris = d3v5.min(files[0].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampIris = d3v5.max(files[0].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampIris = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampIris, maxFalseDistancelampIris])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[0].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampIris(files[0].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneIris = d3v5.min(files[1].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneIris = d3v5.max(files[1].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneIris = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneIris, maxFalseDistanceTsneIris])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[1].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneIris(files[1].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampIris = d3v5.min(files[0].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampIris = d3v5.max(files[0].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampIris = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampIris, maxTrueDistancelampIris])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[0].point[d.id].eij[e.id].error >= valueFTM && files[0].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampIris(files[0].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneIris = d3v5.min(files[1].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneIris = d3v5.max(files[1].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneIris = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneIris, maxTrueDistanceTsneIris])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[1].point[d.id].eij[e.id].error >= -0.10 && files[1].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneIris(files[1].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampIris = d3v5.min(files[0].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampIris = d3v5.max(files[0].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampIris = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampIris, maxMissingDistancelampIris])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[0].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampIris(files[0].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneIris = d3v5.min(files[1].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneIris = d3v5.max(files[1].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneIris = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneIris, maxMissingDistanceTsneIris])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[1].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneIris(files[1].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'segmentation'){

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampSeg = d3v5.min(files[3].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampSeg = d3v5.max(files[3].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampSeg = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampSeg, maxFalseDistancelampSeg])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[3].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampSeg(files[3].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneSeg = d3v5.min(files[4].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneSeg = d3v5.max(files[4].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneSeg = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneSeg, maxFalseDistanceTsneSeg])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[4].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneSeg(files[4].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampSeg = d3v5.min(files[3].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampSeg = d3v5.max(files[3].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampSeg = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampSeg, maxTrueDistancelampSeg])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[3].point[d.id].eij[e.id].error >= valueFTM && files[3].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampSeg(files[3].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneSeg = d3v5.min(files[4].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneSeg = d3v5.max(files[4].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneSeg = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneSeg, maxTrueDistanceTsneSeg])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[4].point[d.id].eij[e.id].error >= -0.10 && files[4].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneSeg(files[4].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampSeg = d3v5.min(files[3].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampSeg = d3v5.max(files[3].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampSeg = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampSeg, maxMissingDistancelampSeg])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[3].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampSeg(files[3].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneSeg = d3v5.min(files[4].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneSeg = d3v5.max(files[4].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneSeg = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneSeg, maxMissingDistanceTsneSeg])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[4].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneSeg(files[4].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'concrete'){

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampConcrete = d3v5.min(files[6].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampConcrete = d3v5.max(files[6].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampConcrete = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampConcrete, maxFalseDistancelampConcrete])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[6].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampConcrete(files[6].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneConcrete = d3v5.min(files[7].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneConcrete = d3v5.max(files[7].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneConcrete = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneConcrete, maxFalseDistanceTsneConcrete])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[7].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneConcrete(files[7].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampConcrete = d3v5.min(files[6].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampConcrete = d3v5.max(files[6].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampConcrete = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampConcrete, maxTrueDistancelampConcrete])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[6].point[d.id].eij[e.id].error >= valueFTM && files[6].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampConcrete(files[6].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneConcrete = d3v5.min(files[7].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneConcrete = d3v5.max(files[7].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneConcrete = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneConcrete, maxTrueDistanceTsneConcrete])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[7].point[d.id].eij[e.id].error >= -0.10 && files[7].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneConcrete(files[7].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampConcrete = d3v5.min(files[6].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampConcrete = d3v5.max(files[6].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampConcrete = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampConcrete, maxMissingDistancelampConcrete])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[6].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampConcrete(files[6].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneConcrete = d3v5.min(files[7].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneConcrete = d3v5.max(files[7].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneConcrete = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneConcrete, maxMissingDistanceTsneConcrete])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[7].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneConcrete(files[7].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'wine'){

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampWine = d3v5.min(files[9].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampWine = d3v5.max(files[9].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampWine = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampWine, maxFalseDistancelampWine])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[9].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampWine(files[9].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneWine = d3v5.min(files[10].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneWine = d3v5.max(files[10].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneWine = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneWine, maxFalseDistanceTsneWine])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[10].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneWine(files[10].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampWine = d3v5.min(files[9].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampWine = d3v5.max(files[9].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampWine = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampWine, maxTrueDistancelampWine])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[9].point[d.id].eij[e.id].error >= valueFTM && files[9].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampWine(files[9].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneWine = d3v5.min(files[10].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneWine = d3v5.max(files[10].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneWine = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneWine, maxTrueDistanceTsneWine])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[10].point[d.id].eij[e.id].error >= -0.10 && files[10].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneWine(files[10].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampWine = d3v5.min(files[9].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampWine = d3v5.max(files[9].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampWine = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampWine, maxMissingDistancelampWine])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[9].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampWine(files[9].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneWine = d3v5.min(files[10].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneWine = d3v5.max(files[10].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneWine = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneWine, maxMissingDistanceTsneWine])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[10].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneWine(files[10].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            }

        } else if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length > '0')){

            d3.selectAll(".pt"+d.id)
                .attr('r', rBrush)
                .style("fill", circleColorBrush)
                .style("stroke", corBorda)
                .style("opacity", circleOpacity)

        } else if (globalThis.selected.indexOf(d.id) > -1) {

            d3.selectAll(".pt"+d.id)
                .style("stroke", corBorda)
                .style('stroke-width', '1')

        }
    }

    let mouseoutDistance = (d) => {

        divClass.transition()
            .duration(100)
            .style("opacity", 0)

        datasetChangeselectValue = d3.select('.selectDataset')
            .property('value')

        if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length < '1')){

            tbody.selectAll("tr").remove()

            d3.selectAll("circle")
                .attr("r", rPadrao)
                .style("fill", "white")
                .style("stroke", corBorda)
                .style("opacity", circleOpacity)
        }

        else if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length > '0')){

            selecaoMultiplaDistance()
            tbody.selectAll("tr").remove()

            d3.selectAll("circle")
                .attr('r',rPadrao)
                .style("fill", 'white')

            if (d3.select("#checkFalse").property("checked")){

                projMult01.selectAll("circle")
                    .filter(a => intersectionPointsFalse.indexOf(a.id) > -1)
                    .attr('r', rPadrao)
                    .style("fill", () => colorScaleDistance(-1))
                    .style("opacity",circleOpacity)

                projMult02.selectAll("circle")
                    .filter(a => intersectionPointsFalseTsne.indexOf(a.id) > -1)
                    .attr('r', rPadrao)
                    .style("fill", () => colorScaleDistance(-1))
                    .style("opacity",circleOpacity)

            }

            if (d3.select("#checkTrue").property("checked")){

                projMult01.selectAll("circle")
                    .filter(a => intersectionPointsTrue.indexOf(a.id) > -1)
                    .attr('r', rPadrao)
                    .style("fill", () => colorScaleDistance(0))
                    .style("opacity",circleOpacity)

                projMult02.selectAll("circle")
                    .filter(a => intersectionPointsTrueTsne.indexOf(a.id) > -1)
                    .attr('r', rPadrao)
                    .style("fill", () => colorScaleDistance(0))
                    .style("opacity",circleOpacity)
            }

            if (d3.select("#checkMissing").property("checked")){

                projMult01.selectAll("circle")
                    .filter(a => intersectionPointsMissing.indexOf(a.id) > -1)
                    .attr('r', rPadrao)
                    .style("fill", () => colorScaleDistance(1))
                    .style("opacity",circleOpacity)

                projMult02.selectAll("circle")
                    .filter(a => intersectionPointsMissingTsne.indexOf(a.id) > -1)
                    .attr('r', rPadrao)
                    .style("fill", () => colorScaleDistance(1))
                    .style("opacity",circleOpacity)

            }

            d3.selectAll("circle")
                .filter(a => globalThis.selected.indexOf(a.id) > -1)
                .attr('r', rBrush)
                .style("fill", circleColorBrush)
                .style("stroke", corBorda)
                .style("opacity", circleOpacity)

            visaoTabularBrushLivre(globalThis.selected)

        } else if (globalThis.selected.indexOf(d.id) > -1) {

            d3.selectAll(".pt"+d.id)
                .style("stroke", corBorda)
                .style('stroke-width', '1')
        }
    }

    /*--------------------------------------------*/

    let mouseoutSliderTsne = (d) => {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

        if (globalThis.selected.indexOf(d.id) === -1){

            if (treemapBorderValue === 'yes'){

                lampEaggTreemap.selectAll("#treemapLamp" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderLampTreemapOpacity}`)

                tsneEaggTreemap.selectAll("#treemapTsne" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderTsneTreemapOpacity}`)

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                d3v4.selectAll("#tr" + (d.id)).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`);

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`);
                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`);
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                d3v4.selectAll("#tr" + d.id).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`);

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`);
                }

            } else if (datasetChangeselectValue === 'concrete') {

                d3v4.selectAll("#tr" + d.id).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`);

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`);
                }

            } else if (datasetChangeselectValue === 'wine') {

                d3v4.selectAll("#tr" + d.id).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`);

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`);
                }

            }

        } else {

            // padrao / op 0.9

            if (treemapBorderValue === 'yes'){

                d3.selectAll("#treemapLamp" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

                d3.selectAll("#treemapTsne" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            datasetChangeselectValue = d3.select('.selectDataset').property('value')

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {
                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            }
        }
    }

    let mouseoutSliderLamp = (d) => {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

        if (globalThis.selected.indexOf(d.id) === -1) {

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap.selectAll("#treemapLamp" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderLampTreemapOpacity}`)

                tsneEaggTreemap.selectAll("#treemapTsne" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderTsneTreemapOpacity}`)

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (e) => colorsLampSeg(e.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)
                    
                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (e) => colorsLampConcrete(e.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.id)
                        .style("stroke", (e) => colorsLampWine(e.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.id)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                d3v4.selectAll("#tr" + (d.id)).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition()
                        .duration(100)
                        .style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                d3v4.selectAll("#tr" + d.id).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsClassSeg(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsClassSeg(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("fill", colorsLampSeg(d.eagg))
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsTsneSeg(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .attr("r", rPadrao)
                        .style("fill", "white")
                        .style("stroke", corBorda)
                        .style("opacity", '1')

                    projMult02.selectAll('circle')
                        .attr("r", rPadrao)
                        .style("fill", "white")
                        .style("stroke", corBorda)
                        .style("opacity", '1')
                }

            } else if (datasetChangeselectValue === 'concrete') {

                d3v4.selectAll("#tr" + d.id).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsClassConcrete(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsClassConcrete(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("fill", colorsLampConcrete(d.eagg))
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsTsneConcrete(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .attr("r", rPadrao)
                        .style("fill", "white")
                        .style("stroke", corBorda)
                        .style("opacity", '1')

                    projMult02.selectAll('circle')
                        .attr("r", rPadrao)
                        .style("fill", "white")
                        .style("stroke", corBorda)
                        .style("opacity", '1')
                }

            } else if (datasetChangeselectValue === 'wine') {

                d3v4.selectAll("#tr" + d.id).remove();

                if (colorByChangeSelectValue === 'class') {

                    divClass.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsClassWine(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsClassWine(d.class))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else if (colorByChangeSelectValue === 'error') {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("fill", colorsLampWine(d.eagg))
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", colorsTsneWine(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                } else {

                    divError.transition().duration(100).style("opacity", '0');

                    projMult01.selectAll('circle')
                        .attr("r", rPadrao)
                        .style("fill", "white")
                        .style("stroke", corBorda)
                        .style("opacity", '1')

                    projMult02.selectAll('circle')
                        .attr("r", rPadrao)
                        .style("fill", "white")
                        .style("stroke", corBorda)
                        .style("opacity", '1')
                }

            }

        } else {

            // padrao / op 0.9

            if (treemapBorderValue === 'yes'){

                d3.selectAll("#treemapLamp" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", sliderLampTreemapOpacity)

                d3.selectAll("#treemapTsne" + d.id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", sliderTsneTreemapOpacity)

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp"+d.id)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne"+d.id)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp"+d.id)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne"+d.id)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp"+d.id)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne"+d.id)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp"+d.id)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne"+d.id)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                } else {

                    divError.transition()
                        .duration(100)
                        .style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)

                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {
                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                } else {

                    divError.transition()
                        .duration(100)
                        .style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {
                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                } else {

                    divError.transition()
                        .duration(100)
                        .style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {
                    projMult01.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.id)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                } else {

                    divError.transition()
                        .duration(100)
                        .style("opacity", '0');

                    projMult01.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .style("fill", "white")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("opacity", `${sliderTsneCircleOpacity}`)
                }

            }
        }
    }

    /*--------------------------------------------*/

    let mouseoutSliderTsneTreemap = (d) => {

        divTreemap.transition().duration(100).style("opacity", '0');

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

        if (globalThis.selected.indexOf(d.data.name) === -1){

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap.selectAll("#treemapLamp" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

                tsneEaggTreemap.selectAll("#treemapTsne" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '0.1')

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                d3v4.selectAll("#tr" + (d.data.name)).remove();

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", sliderTsneCircleOpacity);

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity);
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                d3v4.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", sliderTsneCircleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                d3v4.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", sliderTsneCircleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'wine') {

                d3v4.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", sliderTsneCircleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            }

        } else {

            // padrao / op 0.9

            if (treemapBorderValue === 'yes'){

                d3.selectAll("#treemapLamp" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

                d3.selectAll("#treemapTsne" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }

            }

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {
                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {
                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {
                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {
                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {
                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", circleOpacity)

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)

                }

            }
        }
    }

    let mouseoutSliderLampTreemap = (d) => {

        divTreemap.transition().duration(100).style("opacity", '0')

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

        if (globalThis.selected.indexOf(d.data.name) === -1) {

            if (treemapBorderValue === 'yes') {

                lampEaggTreemap.selectAll("#treemapLamp" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderLampTreemapOpacity}`)

                tsneEaggTreemap.selectAll("#treemapTsne" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", `${sliderTsneTreemapOpacity}`)
            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                d3v4.selectAll("#tr" + (d.data.name)).remove()

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", sliderTsneCircleOpacity)

                } else {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                d3v4.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", sliderTsneCircleOpacity)

                } else {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                d3v4.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", sliderTsneCircleOpacity)

                } else {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'wine') {

                d3v4.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    projMult01.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll('circle')
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", sliderTsneCircleOpacity)

                } else {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`);

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            }

        } else {

            // padrao / op 0.9

            if (treemapBorderValue === 'yes') {

                d3.selectAll("#treemapLamp" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

                d3.selectAll("#treemapTsne" + d.data.name)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            } else {

                if (datasetChangeselectValue === 'iris') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'segmentation') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'concrete') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)
                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                } else if (datasetChangeselectValue === 'wine') {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + d.data.name)
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", `${sliderLampTreemapOpacity}`)

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + d.data.name)
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        // .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", `${sliderTsneTreemapOpacity}`)

                }
            }

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassIris(d.class))
                        .style("opacity", circleOpacity)

                } else {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassSeg(d.class))
                        .style("opacity", circleOpacity)

                } else {
                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {
                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassConcrete(d.class))
                        .style("opacity", circleOpacity)
                } else {
                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {

                    d3.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsClassWine(d.class))
                        .style("opacity", circleOpacity)

                } else {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", `${sliderLampCircleOpacity}`)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", sliderTsneCircleOpacity)
                }

            }
        }
    }

    /*--------------------------------------------*/

    let mouseoverTreemap = (d) => {

        if(sessionStorage.getItem('mouseoverLabelValue') === 'yes'){
            divTreemap.transition().duration(300).style("opacity", circleOpacity)
        }

        sliderLampCircleOpacity = window.getComputedStyle(document.querySelector('#ptLamp'+d.data.name)).getPropertyValue("opacity")
        sliderTsneCircleOpacity = window.getComputedStyle(document.querySelector('#ptTsne'+d.data.name)).getPropertyValue("opacity")
        sliderLampTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapLamp'+d.data.name)).getPropertyValue("opacity")
        sliderTsneTreemapOpacity = window.getComputedStyle(document.querySelector('#treemapTsne'+d.data.name)).getPropertyValue("opacity")

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        d3v4.selectAll(".pt"+d.data.name).raise();
        highlightedTreemapClick(d.data.name);
        visaoTabularMouseover(d.data.name);

        if(language === 'en'){
            divTreemap.html("ER: " + d.data.parent + "<br/>" + "Id: " + (d.data.name) + "<br/>" + "Error: " + (d.data.error.toFixed(2)))
                .style("left", (d3.event.pageX - 130) + "px")
                .style("top", (d3.event.pageY - 65) + "px");
        } else if (language === 'ptbr') {
            divTreemap.html("IE: " + d.data.parent + "<br/>" + "Id: " + (d.data.name) + "<br/>" + "Erro: " + (d.data.error.toFixed(2)))
                .style("left", (d3.event.pageX - 130) + "px")
                .style("top", (d3.event.pageY - 65) + "px");
        }

        highlightedCircleClick(d.data.name);

    };

    let mouseoutTreemap = (d) => {

        divTreemap.transition().duration(100).style("opacity", '0');

        // d3v4.selectAll("#tr"+(d.data.name)).remove();
        tbody.selectAll("#tr" + (d.data.name)).remove();

        if (globalThis.selected.indexOf(d.data.name) === -1) {

            unhighlightedTreemapClick(d.data)

            datasetChangeselectValue = d3.select('.selectDataset').property('value')

            colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.data.class) === -1){
                        d3.selectAll(".pt" + d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassIris(d.class))
                            .style("opacity", circleOpacity)

                    } else {
                        d3.selectAll(".pt" + d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassIris(d.class))
                            .style("opacity", 0.2)
                    }
                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampIris(d.eagg))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll(".pt" + d.data.name)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneIris(d.eagg))
                        .style("opacity", circleOpacity)

                } else {

                    d3.selectAll("circle")
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", "white")
                        .style("opacity", circleOpacity)
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                // tbody.selectAll("#tr" + (d.data.name)).remove();

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.data.class) === -1){

                        d3.selectAll(".pt"+d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassSeg(d.class))
                            .style("opacity", circleOpacity)

                    } else{

                        d3.selectAll(".pt"+d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassSeg(d.class))
                            .style("opacity", 0.2)

                    }

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampSeg(d.eagg))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneSeg(d.eagg))
                        .style("opacity", circleOpacity)
                } else {

                    d3.selectAll("circle")
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", "white")
                        .style("opacity", circleOpacity)
                }

            } else if (datasetChangeselectValue === 'concrete') {

                tbody.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.data.class) === -1) {

                        d3.selectAll(".pt"+d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassConcrete(d.class))
                            .style("opacity", circleOpacity)

                    } else {

                        d3.selectAll(".pt"+d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassConcrete(d.class))
                            .style("opacity", 0.2)
                    }

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampConcrete(d.eagg))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneConcrete(d.eagg))
                        .style("opacity", circleOpacity)
                } else {

                    d3.selectAll("circle")
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", "white")
                        .style("opacity", circleOpacity)
                }

            } else if (datasetChangeselectValue === 'wine') {

                tbody.selectAll("#tr" + d.data.name).remove();

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.data.class) === -1) {

                        d3.selectAll(".pt"+d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassWine(d.class))
                            .style("opacity", circleOpacity)

                    } else {

                        d3.selectAll(".pt"+d.data.name)
                            .transition()
                            .duration(100)
                            .attr("r", rPadrao)
                            .style("stroke", corBorda)
                            .style("fill", (d) => colorsClassWine(d.class))
                            .style("opacity", 0.2)
                    }

                } else if (colorByChangeSelectValue === 'error') {

                    projMult01.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsLampWine(d.eagg))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll(".pt" + d.data.name)
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", (d) => colorsTsneWine(d.eagg))
                        .style("opacity", circleOpacity)
                } else {

                    d3.selectAll("circle")
                        .transition()
                        .duration(100)
                        .attr("r", rPadrao)
                        .style("stroke", corBorda)
                        .style("fill", "white")
                        .style("opacity", circleOpacity)
                }

            }
        }
    };

    /*--------------------------------------------*/

    function highlightedCircleClick(d) {

        d3.selectAll(".pt"+d)
            .attr('r', rBrush)
            .style("fill", circleColorBrush)
            .style("stroke", corBorda)
            .style("opacity", circleOpacity)
    }

    function highlightedTreemapClick(d){
        d3.selectAll("#treemapLamp"+d)
            .style("stroke", circleColorBrush)
            .style("stroke-width", '4')
            .style("opacity", '1')

        d3.selectAll("#treemapTsne"+d)
            .style("stroke", circleColorBrush)
            .style("stroke-width", '4')
            .style("opacity", '1')
    }

    /*--------------------------------------------*/

    function unhighlightedTreemapClick(d){

        if(d.id){
            id = d.id
        } else {
            id = d.name
        }

        let treemapBorderValue = sessionStorage.getItem('treemapBorderValue')

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (treemapBorderValue === 'yes') {

            if(elementClass.indexOf(d.class) === -1) {

                d3.selectAll("#treemapLamp" + id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

                d3.selectAll("#treemapTsne"+id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            } else{

                d3.selectAll("#treemapLamp" + id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '0.2')

                d3.selectAll("#treemapTsne"+id)
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '0.2')
            }

        } else {

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.class) === -1){

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassIris(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassIris(d.data.class))
                            .style("opacity", '1')

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassIris(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassIris(d.data.class))
                            .style("opacity", '1')

                    } else{

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassIris(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassIris(d.data.class))
                            .style("opacity", 0.2)

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassIris(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassIris(d.data.class))
                            .style("opacity", 0.2)
                    }

                } else {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + id)
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampIris(d.data.error))

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + id)
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneIris(d.data.error))
                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.class) === -1){

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassSeg(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassSeg(d.data.class))
                            .style("opacity", '1')

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassSeg(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassSeg(d.data.class))
                            .style("opacity", '1')

                    } else {

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassSeg(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassSeg(d.data.class))
                            .style("opacity", 0.2)

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassSeg(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassSeg(d.data.class))
                            .style("opacity", 0.2)
                    }

                } else {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + id)
                        .style("stroke", (e) => colorsLampSeg(e.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (e) => colorsLampSeg(e.data.error))

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + id)
                        .style("stroke", (e) => colorsTsneSeg(e.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (e) => colorsTsneSeg(e.data.error))
                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.class) === -1){

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassConcrete(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassConcrete(d.data.class))
                            .style("opacity", '1')

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassConcrete(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassConcrete(d.data.class))
                            .style("opacity", '1')

                    } else {

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassConcrete(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassConcrete(d.data.class))
                            .style("opacity", 0.2)

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassConcrete(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassConcrete(d.data.class))
                            .style("opacity", 0.2)
                    }

                } else {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + id)
                        .style("stroke", (e) => colorsLampConcrete(e.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (e) => colorsLampConcrete(e.data.error))

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + id)
                        .style("stroke", (e) => colorsTsneConcrete(e.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (e) => colorsTsneConcrete(e.data.error))
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {

                    if(elementClass.indexOf(d.class) === -1){

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassWine(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassWine(d.data.class))
                            .style("opacity", '1')

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassWine(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassWine(d.data.class))
                            .style("opacity", '1')

                    } else {

                        lampEaggTreemap
                            .selectAll("#treemapLamp" + id)
                            .style("stroke", (d) => colorsClassWine(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassWine(d.data.class))
                            .style("opacity", 0.2)

                        tsneEaggTreemap
                            .selectAll("#treemapTsne" + id)
                            .style("stroke", (d) => colorsClassWine(d.data.class))
                            .style("stroke-width", borderTreemap)
                            .style("fill", (d) => colorsClassWine(d.data.class))
                            .style("opacity", 0.2)
                    }

                } else {

                    lampEaggTreemap
                        .selectAll("#treemapLamp" + id)
                        .style("stroke", (e) => colorsLampWine(e.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (e) => colorsLampWine(e.data.error))

                    tsneEaggTreemap
                        .selectAll("#treemapTsne" + id)
                        .style("stroke", (e) => colorsTsneWine(e.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (e) => colorsTsneWine(e.data.error))
                }

            }
        }
    }

    function unhighlightedTreemapBrushLivre(){

        let datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (treemapBorderValue === 'yes'){

            if (datasetChangeselectValue === 'iris') {

                d3.selectAll('.lampTreemapIris, .tsneTreemapIris')
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            } else if (datasetChangeselectValue === 'segmentation') {

                d3.selectAll('.lampTreemapSeg, .tsneTreemapSeg')
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            } else if (datasetChangeselectValue === 'concrete') {

                d3.selectAll('.lampTreemapConcrete, .tsneTreemapConcrete')
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            } else if (datasetChangeselectValue === 'wine') {

                d3.selectAll('.lampTreemapWine, .tsneTreemapWine')
                    .style("stroke", "gray")
                    .style("stroke-width", '0.3')
                    .style("opacity", '1')

            }

        } else {

            if (datasetChangeselectValue === 'iris') {

                if (colorByChangeSelectValue === 'class') {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsClassIris(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsClassIris(d.data.class))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsClassIris(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsClassIris(d.data.class))
                        .style("opacity", treemapOpacity)

                } else {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsLampIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampIris(d.data.error))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsTsneIris(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneIris(d.data.error))
                        .style("opacity", treemapOpacity)

                }

            } else if (datasetChangeselectValue === 'segmentation') {

                if (colorByChangeSelectValue === 'class') {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsLampSeg(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampSeg(d.data.class))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsTsneSeg(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneSeg(d.data.class))
                        .style("opacity", treemapOpacity)

                } else {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsLampSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampSeg(d.data.error))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsTsneSeg(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneSeg(d.data.error))
                        .style("opacity", treemapOpacity)

                }

            } else if (datasetChangeselectValue === 'concrete') {

                if (colorByChangeSelectValue === 'class') {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsLampConcrete(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampConcrete(d.data.class))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsTsneConcrete(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneConcrete(d.data.class))
                        .style("opacity", treemapOpacity)

                } else {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsLampConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampConcrete(d.data.error))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsTsneConcrete(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneConcrete(d.data.error))
                        .style("opacity", treemapOpacity)
                }

            } else if (datasetChangeselectValue === 'wine') {

                if (colorByChangeSelectValue === 'class') {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsLampWine(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampWine(d.data.class))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsTsneWine(d.data.class))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneWine(d.data.class))
                        .style("opacity", treemapOpacity)

                } else {

                    lampEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsLampWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsLampWine(d.data.error))
                        .style("opacity", treemapOpacity)

                    tsneEaggTreemap
                        .selectAll('rect')
                        .style("stroke", (d) => colorsTsneWine(d.data.error))
                        .style("stroke-width", borderTreemap)
                        .style("fill", (d) => colorsTsneWine(d.data.error))
                        .style("opacity", treemapOpacity)
                }

            }
        }
    }

    function unhighlightedCircleClassClick(d) {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            d3.selectAll(".pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassIris(d.label))
                .style("opacity", circleOpacity)

        } else if (datasetChangeselectValue === 'segmentation') {

            d3.selectAll(".pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsClassSeg(d.label))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'concrete') {

            d3.selectAll(".pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsClassConcrete(d.label))
                .style("opacity",circleOpacity);

        } else if (datasetChangeselectValue === 'wine') {

            d3.selectAll(".pt"+d.id)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsClassWine(d.label))
                .style("opacity",circleOpacity);

        }
    }

    function unhighlightedCircleClass() {

        datasetChangeselectValue = d3.select('.selectDataset')
            .property('value')

        if (datasetChangeselectValue === 'iris') {
            d3.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassIris(d.class))
                .style("opacity", circleOpacity)

        } else if (datasetChangeselectValue === 'segmentation') {

            d3.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassSeg(d.class))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'concrete') {

            d3.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassConcrete(d.class))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'wine') {

            d3.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsClassWine(d.class))
                .style("opacity",circleOpacity)

        }
    }

    function unhighlightedCircleErrorLamp() {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            projMult01.selectAll("circle")
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampIris(d.eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'segmentation') {

            projMult01.selectAll("circle")
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampSeg(d.eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'concrete') {

            projMult01.selectAll("circle")
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampConcrete(d.eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'wine') {

            projMult01.selectAll("circle")
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsLampWine(d.eagg))
                .style("opacity",circleOpacity)

        }

    }

    function unhighlightedCircleErrorTsneClick(d) {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            projMult02.selectAll(".pt"+d)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsTsneIris(files[1].point[d].eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'segmentation') {

            projMult02.selectAll(".pt"+d)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsTsneSeg(files[4].point[d].eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'concrete') {

            projMult02.selectAll(".pt"+d)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsTsneConcrete(files[7].point[d].eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'wine') {

            projMult02.selectAll(".pt"+d)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsTsneWine(files[10].point[d].eagg))
                .style("opacity",circleOpacity)

        }
    }

    function unhighlightedCircleErrorLampClick(d) {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            projMult01.selectAll(".pt"+d)
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsLampIris(files[0].point[d].eagg))
                .style("opacity",circleOpacity);

        } else if (datasetChangeselectValue === 'segmentation') {

            projMult01.selectAll(".pt"+d)
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsLampSeg(files[3].point[d].eagg))
                .style("opacity",circleOpacity);

        } else if (datasetChangeselectValue === 'concrete') {

            projMult01.selectAll(".pt"+d)
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsLampConcrete(files[6].point[d].eagg))
                .style("opacity",circleOpacity);

        } else if (datasetChangeselectValue === 'wine') {

            projMult01.selectAll(".pt"+d)
                .transition()
                .duration(200)
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", colorsLampWine(files[10].point[d].eagg))
                .style("opacity",circleOpacity);

        }
    }

    function unhighlightedCircleErrorTsne() {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            projMult02.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneIris(d.eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'segmentation') {

            projMult02.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneSeg(d.eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'concrete') {

            projMult02.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneConcrete(d.eagg))
                .style("opacity",circleOpacity)

        } else if (datasetChangeselectValue === 'wine') {

            projMult02.selectAll("circle")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("fill", (d) => colorsTsneWine(d.eagg))
                .style("opacity",circleOpacity)

        }
    }

    /*--------------------------------------------*/

    function visaoTabularMouseover(id){

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            if (globalThis.selected.indexOf(id) === -1) {

                tbody.append('tr')
                    .attr("id", "tr" + (id))
                    .selectAll('td')
                    .data(d3.values(files[2][id])).enter()
                    .append('td')
                    .text((d) => d);
            }

        } else if (datasetChangeselectValue === 'segmentation') {

            if (globalThis.selected.indexOf(id) === -1){

                tbody.append('tr')
                    .attr("id", "tr"+(id))
                    .selectAll('td')
                    .data(d3.values(files[5][id])).enter()
                    .append('td')
                    .text((d) => d)
            }

        } else if (datasetChangeselectValue === 'concrete') {

            if (globalThis.selected.indexOf(id) === -1){

                tbody.append('tr')
                    .attr("id", "tr"+(id))
                    .selectAll('td')
                    .data(d3.values(files[8][id])).enter()
                    .append('td')
                    .text((d) => d)
            }

        } else if (datasetChangeselectValue === 'wine') {

            if (globalThis.selected.indexOf(id) === -1){

                tbody.append('tr')
                    .attr("id", "tr"+(id))
                    .selectAll('td')
                    .data(d3.values(files[11][id])).enter()
                    .append('td')
                    .text((d) => d)
            }

        }
    }

    function visaoTabularBrushClick(id) {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris'){

            tbody.selectAll('tr')
                .data(id).enter()
                .append('tr')
                .attr("id", (d) => "tr"+d)
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[2][d])).enter()
                .append('td')
                .text((d) => d);

        } else if (datasetChangeselectValue === 'segmentation'){

            tbody.selectAll('tr')
                .data(id).enter()
                .append('tr')
                .attr("id", (d) => "tr"+d)
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[5][d])).enter()
                .append('td')
                .text((d) => d);

        } else if (datasetChangeselectValue === 'concrete'){

            tbody.selectAll('tr')
                .data(id).enter()
                .append('tr')
                .attr("id", (d) => "tr"+d)
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[8][d])).enter()
                .append('td')
                .text((d) => d);

        } else if (datasetChangeselectValue === 'wine'){

            tbody.selectAll('tr')
                .data(id).enter()
                .append('tr')
                .attr("id", (d) => "tr"+d)
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[11][d])).enter()
                .append('td')
                .text((d) => d);

        }
    }

    function visaoTabularBrushLivre(ids) {

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris'){

            tbody.selectAll('tr')
                .data(ids).enter()
                .append('tr')
                .attr("id", (d) => "tr"+(d+'1'))
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[2][d])).enter()
                .append('td')
                .text((d) => d)

        } else if (datasetChangeselectValue === 'segmentation'){

            tbody.selectAll('tr')
                .data(ids).enter()
                .append('tr')
                .attr("id", (d) => "tr"+d)
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[5][d])).enter()
                .append('td')
                .text((d) => d);

        } else if (datasetChangeselectValue === 'concrete'){

            tbody.selectAll('tr')
                .data(ids).enter()
                .append('tr')
                .attr("id", (d) => "tr"+d)
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[8][d])).enter()
                .append('td')
                .text((d) => d);

        } else if (datasetChangeselectValue === 'wine'){

            tbody.selectAll('tr')
                .data(ids).enter()
                .append('tr')
                .attr("id", (d) => "tr"+d)
                .on('mouseover', mouseoverTableView)
                .on('mouseout', mouseoutTableView)
                .selectAll('td')
                .data((d) => d3.values(files[11][d])).enter()
                .append('td')
                .text((d) => d);

        }
    }

    function visaotabularSliderSegLamp(ids){
        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+d)
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[5][d])).enter()
            .append('td')
            .text((d) => d);
    }

    function visaotabularSliderSegTsne(ids){
        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+d)
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[5][d])).enter()
            .append('td')
            .text((d) => d);
    }

    function visaotabularSliderConcreteLamp(ids){
        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+d)
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[8][d])).enter()
            .append('td')
            .text((d) => d);
    }

    function visaotabularSliderConcreteTsne(ids){
        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+d)
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[8][d])).enter()
            .append('td')
            .text((d) => d);
    }

    function visaotabularSliderIrisTsne(ids){
        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+(d+'1'))
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[2][d])).enter()
            .append('td')
            .text((d) => d)
    }

    function visaotabularSliderIrisLamp(ids){

        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+(d+'1'))
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[2][d])).enter()
            .append('td')
            .text((d) => d)
    }

    function visaotabularSliderWineLamp(ids){
        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+d)
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[11][d])).enter()
            .append('td')
            .text((d) => d);
    }

    function visaotabularSliderWineTsne(ids){
        tbody.selectAll('tr')
            .data(ids).enter()
            .append('tr')
            .attr("id", (d) => "tr"+d)
            .on('mouseover', mouseoverTableView)
            .on('mouseout', mouseoutTableViewSlider)
            .selectAll('td')
            .data((d) => d3.values(files[11][d])).enter()
            .append('td')
            .text((d) => d);
    }

    function brushLivreTreemap(ids) {
        ids.map((d) => {
            d3.selectAll("#treemapLamp"+d)
                .style("stroke", circleColorBrush)
                .style("stroke-width", '3')

            d3.selectAll("#treemapTsne"+d)
                .style("stroke", circleColorBrush)
                .style("stroke-width", '3')
        })
    }

    let zoomSvg1 = d3.behavior.zoom()
        .scaleExtent([0.5,30])
        .on("zoom", () => {
            projMult01.selectAll('circle')
                .attr("transform",
                    "translate(" + d3.event.translate + ")"
                    + " scale(" + d3.event.scale + ")")
                .attr('cursor', 'pointer');
            d3.selectAll(".selection1, .terminator1").remove();
            svg1ZoomX = d3.event.translate[0];
            svg1ZoomY = d3.event.translate[1];
            svg1ZoomScale = d3.event.scale;
        });

    let zoomSvg2 = d3.behavior.zoom()
        .scaleExtent([0.5,30])
        .on("zoom", () => {
            projMult02.selectAll('circle')
                .attr("transform",
                    "translate(" + d3.event.translate + ")"
                    + " scale(" + d3.event.scale + ")")
                .attr('cursor', 'pointer')
            d3.selectAll(".selection2, .terminator2").remove()
            svg2ZoomX = d3.event.translate[0]
            svg2ZoomY = d3.event.translate[1]
            svg2ZoomScale = d3.event.scale
        })

    function infoPointCreate(ids){
        infoPointLabelTotalTextDiv
            .append('text')
            .text(() => {
                if(language === 'en'){
                    return 'Total Points Selected: '
                } else if (language === 'ptbr') {
                    return 'Total de Pontos Selecionados: '
                }
            })
        infoPointLabelTotalValueDiv
            .append('text')
            .text(`${ids.length}`)
    }

    function infoPointDelete(){
        d3.select('#infoPointLabelTotalTextDiv').selectAll("*").remove()
        d3.select('#infoPointLabelTotalValueDiv').selectAll("*").remove()
    }

    /* brush livre mp1 */

    let point1
    let brushLivreMp1

    let coordsSvg1,
        lineSvg1 = d3.svg.line(),
        dragSvg1 = d3.behavior.drag()
            .on("dragstart", () => {
                coordsSvg1 = [];
                brushLivreMp1 = d3.select(this);
                d3.selectAll(".selection1, .terminator1").remove();

                projMult01.append("path")
                    .attr("class", "selection1")
                    .attr("id", "selection1")
            })
            .on("drag", function() {
                coordsSvg1.push(d3.mouse(this));
                brushLivreMp1 = d3.select(this);

                brushLivreMp1.select(".selection1")
                    .attr("d", lineSvg1(coordsSvg1));

                brushLivreMp1.selectAll("circle")
                    .each(function(d) {
                        point1 = [d3.select(this).attr("cx"),
                            d3.select(this).attr("cy")];
                        if (pointInPolygon1(point1, coordsSvg1)) {
                            if (globalThis.selected.indexOf(d.id) === -1) {
                                globalThis.selected.push(d.id);
                            }
                        }
                    });

                highlight1(globalThis.selected)
                infoPointDelete()
                infoPointCreate(globalThis.selected)

            })
            .on("dragend", function() {
                brushLivreMp1 = d3.select(this);
                if (coordsSvg1.length === 0) {
                    d3.selectAll("path").remove();
                    unhighlight1();
                    return;
                }
                projMult01.append("path")
                    .attr("class", "terminator1")
                    .attr("id", "terminator1")
                    .attr("d", lineSvg1([coordsSvg1[0],
                        coordsSvg1[coordsSvg1.length - 1]]));
            });

    function svg1YBrushScala(y1) {
        if (svg1ZoomY == null){
            return y1;
        } else { return y1 * svg1ZoomScale + svg1ZoomY; }
    }

    function svg1XBrushScala(x1) {
        if (svg1ZoomX == null){
            return x1;
        } else { return x1 * svg1ZoomScale + svg1ZoomX; }
    }

    function pointInPolygon1(xyPoint1, coordMouse1) {

        let xi, xj, i, intersect,
            x = svg1XBrushScala(xyPoint1[0]),
            y = svg1YBrushScala(xyPoint1[1]),
            inside = false;

        for (let i = 0, j = coordMouse1.length - 1; i < coordMouse1.length; j = i++) {
            xi = coordMouse1[i][0],
                yi = coordMouse1[i][1],
                xj = coordMouse1[j][0],
                yj = coordMouse1[j][1],
                intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    function unhighlight1() {
        d3.selectAll("circle").classed("highlighted1", false)
    }

    function highlight1(ids1) {

        unhighlight1()

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        if (colorByChangeSelectValue === 'distance') {

            d3.selectAll('circle').style('fill', 'white')

            datasetChangeselectValue = d3.select('.selectDataset')
                .property('value')

            if (ids1.length === '1') {

                tbody.selectAll("tr").remove()

                if (datasetChangeselectValue === 'iris') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[0].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[1].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[0].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[1].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)
                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[0].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[1].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)
                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids1.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(ids1)

                } else if (datasetChangeselectValue === 'segmentation') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[3].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[4].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[3].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[4].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[3].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[4].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)
                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids1.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(globalThis.selected)

                } else if (datasetChangeselectValue === 'concrete') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[6].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[7].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[6].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[7].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[6].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[7].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids1.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(globalThis.selected)

                } else if (datasetChangeselectValue === 'wine') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[9].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[10].point[ids1[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[9].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[10].point[ids1[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[9].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[10].point[ids1[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids1.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(globalThis.selected)

                }
De
            } else if (ids1.length > '1') {

                selecaoMultiplaDistance()
                tbody.selectAll("tr").remove()

                if (d3.select("#checkFalse").property("checked")) {

                    projMult01.selectAll("circle")
                        .filter(a => intersectionPointsFalse.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(-1))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll("circle")
                        .filter(a => intersectionPointsFalseTsne.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(-1))
                        .style("opacity", circleOpacity)

                }

                if (d3.select("#checkTrue").property("checked")) {

                    projMult01.selectAll("circle")
                        .filter(a => intersectionPointsTrue.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(0))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll("circle")
                        .filter(a => intersectionPointsTrueTsne.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(0))
                        .style("opacity", circleOpacity)

                }

                if (d3.select("#checkMissing").property("checked")) {

                    projMult01.selectAll("circle")
                        .filter(a => intersectionPointsMissing.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(1))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll("circle")
                        .filter(a => intersectionPointsMissingTsne.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(1))
                        .style("opacity", circleOpacity)

                }

                d3v4.selectAll("circle")
                    .filter(a => ids1.indexOf(a.id) > -1)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)
                    .raise()

                visaoTabularBrushLivre(ids1)

            }

        } else {

            d3.selectAll("circle")
                .filter(d => ids1.indexOf(d.id) > -1)
                .classed("highlighted1", true)
                .transition()
                .duration(400)
                .attr('r', rBrush)
                .style("fill", circleColorBrush)
                .style("stroke", "black")
                .style("opacity", circleOpacity)

            visaoTabularBrushLivre(ids1)
            brushLivreTreemap(ids1)
        }
    }

/////////

    let coordsSvg2,
        lineSvg2 = d3.svg.line(),
        dragSvg2 = d3.behavior.drag()
            .on("dragstart", function() {
                coordsSvg2 = [];
                brushLivreMp2 = d3.select(this);
                d3.selectAll(".selection2, .terminator2").remove();
                projMult02.append("path")
                    .attr("class", "selection2")
                    .attr("id", "selection2");
            })
            .on("drag", function() {
                coordsSvg2.push(d3.mouse(this));

                brushLivreMp2 = d3.select(this);
                brushLivreMp2.select(".selection2").attr({
                    d: lineSvg2(coordsSvg2)
                });

                brushLivreMp2.selectAll("circle").each(function(d) {
                    point2 = [d3.select(this).attr("cx"), d3.select(this).attr("cy")];
                    if (pointInPolygon2(point2, coordsSvg2)) {
                        if (globalThis.selected.indexOf(d.id) === -1) {
                            globalThis.selected.push(d.id);
                        }
                    }
                });
                highlight2(globalThis.selected)
                infoPointDelete()
                infoPointCreate(globalThis.selected)
            })
            .on("dragend", function() {
                brushLivreMp2 = d3.select(this);
                if (coordsSvg2.length === 0) {
                    d3.selectAll("svg path").remove();
                    unhighlight2();
                    return;
                }
                brushLivreMp2.append("path").attr({
                    "class": "terminator2",
                    d: lineSvg2([coordsSvg2[0], coordsSvg2[coordsSvg2.length-1]])
                });
            });

    function svg2YBrushScala(point1) {
        if (svg2ZoomY == null){
            return point1;
        } else { return point1 * svg2ZoomScale + svg2ZoomY; }
    }

    function svg2XBrushScala(point0) {
        if (svg2ZoomX == null){
            return point0;
        } else { return point0 * svg2ZoomScale + svg2ZoomX; }
    }

    function pointInPolygon2 (xyPoint2, coordMouse2) {
        let xi, xj, i, intersect,
            x = svg2XBrushScala(xyPoint2[0]),
            y = svg2YBrushScala(xyPoint2[1]),
            inside = false;

        for (let i = 0, j = coordMouse2.length - 1; i < coordMouse2.length; j = i++) {
            xi = coordMouse2[i][0],
                yi = coordMouse2[i][1],
                xj = coordMouse2[j][0],
                yj = coordMouse2[j][1],
                intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    function unhighlight2() {
        d3.selectAll("circle").classed("highlighted2", false);
    }

    function highlight2(ids2) {
        unhighlight2()

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')

        if (colorByChangeSelectValue === 'distance') {

            d3.selectAll('circle').style('fill', 'white')
            datasetChangeselectValue = d3.select('.selectDataset').property('value')

            if (ids2.length === '1') {

                tbody.selectAll("tr").remove()

                if (datasetChangeselectValue === 'iris') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[0].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[1].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[0].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[1].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)
                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[0].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[1].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)
                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids2.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(ids2)

                } else if (datasetChangeselectValue === 'segmentation') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[3].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[4].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[3].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[4].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[3].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[4].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids2.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(ids2)

                } else if (datasetChangeselectValue === 'concrete') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[6].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[7].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[6].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[7].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[6].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[7].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids2.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(ids2)

                } else if (datasetChangeselectValue === 'wine') {

                    if (d3.select("#checkFalse").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[9].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[10].point[ids2[0]].eij[e.id].neighbor === -1)
                            .style("fill", () => colorScaleDistance(-1))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkTrue").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[9].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[10].point[ids2[0]].eij[e.id].neighbor === 0)
                            .style("fill", () => colorScaleDistance(0))
                            .style("opacity", circleOpacity)

                    }

                    if (d3.select("#checkMissing").property("checked")) {

                        projMult01.selectAll("circle")
                            .filter(e => files[9].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                        projMult02.selectAll("circle")
                            .filter(e => files[10].point[ids2[0]].eij[e.id].neighbor === 1)
                            .style("fill", () => colorScaleDistance(1))
                            .style("opacity", circleOpacity)

                    }

                    d3v4.selectAll("circle")
                        .filter(a => ids2.indexOf(a.id) > -1)
                        .attr('r', rBrush)
                        .style("fill", circleColorBrush)
                        .style("stroke", corBorda)
                        .style("opacity", circleOpacity)
                        .raise()

                    visaoTabularBrushLivre(ids2)

                }

            } else if (ids2.length > '1') {

                selecaoMultiplaDistance()
                tbody.selectAll("tr").remove()

                if (d3.select("#checkFalse").property("checked")) {

                    projMult01.selectAll("circle")
                        .filter(a => intersectionPointsFalse.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(-1))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll("circle")
                        .filter(a => intersectionPointsFalseTsne.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(-1))
                        .style("opacity", circleOpacity)

                }

                if (d3.select("#checkTrue").property("checked")) {

                    projMult01.selectAll("circle")
                        .filter(a => intersectionPointsTrue.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(0))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll("circle")
                        .filter(a => intersectionPointsTrueTsne.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(0))
                        .style("opacity", circleOpacity)

                }

                if (d3.select("#checkMissing").property("checked")) {

                    projMult01.selectAll("circle")
                        .filter(a => intersectionPointsMissing.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(1))
                        .style("opacity", circleOpacity)

                    projMult02.selectAll("circle")
                        .filter(a => intersectionPointsMissingTsne.indexOf(a.id) > -1)
                        .style("fill", () => colorScaleDistance(1))
                        .style("opacity", circleOpacity)

                }

                d3v4.selectAll("circle")
                    .filter(a => ids2.indexOf(a.id) > -1)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)
                    .raise()

                visaoTabularBrushLivre(globalThis.selected)
            }
        } else {

            d3.selectAll("circle")
                .filter(d => ids2.indexOf(d.id) > -1)
                .classed("highlighted1", true)
                .transition()
                .duration(400)
                .attr('r', rBrush)
                .style("fill", circleColorBrush)
                .style("stroke", "black")
                .style("opacity", circleOpacity)

            visaoTabularBrushLivre(ids2)
            brushLivreTreemap(ids2)
        }
    }

////////////////////////////////////////////////////
    removeBrush = () => {

        pointsFalse = []
        intersectionPointsFalse = []

        pointsTrue = []
        intersectionPointsTrue = []

        pointsMissing = []
        intersectionPointsMissing = []

        tbody.selectAll("tr").remove();

        elementClass.map((d) => {
            projMultLegend.select("#class" + d)
                .attr("fill-opacity", circleOpacity)
        })

        elementClass = []

        globalThis.selected = [];
        projMult01.selectAll("path").remove();
        projMult02.selectAll("path").remove();

        circleOpacity = '0.9'
        treemapOpacity = '1'
        rPadrao = 5
        rectBackground = '#f7f7f7'

        d3v4.select('#sliderLampHtml').selectAll('*').remove()
        d3v4.select('#sliderTsneHtml').selectAll('*').remove()

        d3v4.select('#sizeCircle').selectAll('*').remove()
        d3v4.select('#background').selectAll('*').remove()
        d3v4.select('#transparencyCircle').selectAll('*').remove()

        sizeCircleMp()
        backgroundPm()
        transparencyCircleMp()

        sliderLampMp()
        sliderTsneMp()

        d3v4.selectAll('#projMult01Rect, #projMult02Rect').style("fill", rectBackground)

        projMult01.selectAll("circle").remove()
        projMult02.selectAll("circle").remove()

        colorByChangeSelectValue = d3.select('.selectColorBy').property('value')
        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        unhighlightedTreemapBrushLivre()

        if(datasetChangeselectValue === 'segmentation') {
            if(colorByChangeSelectValue === 'error') {
                mp1ErrorSeg()
                mp2ErrorSeg()
            } else if(colorByChangeSelectValue === 'class') {
                mp1ClassSeg()
                mp2ClassSeg()
            } else{
                mp1DistancePreservation(files[3].point)
                mp2DistancePreservation(files[4].point)
            }
        } else if(datasetChangeselectValue === 'iris') {
            if(colorByChangeSelectValue === 'error') {
                mp1ErrorIris()
                mp2ErrorIris()
            } else if(colorByChangeSelectValue === 'class') {
                mp1ClassIris()
                mp2ClassIris()
            } else {
                mp1DistancePreservation(files[0].point)
                mp2DistancePreservation(files[1].point)
            }
        } else if(datasetChangeselectValue === 'concrete') {
            if(colorByChangeSelectValue === 'error') {
                mp1ErrorConcrete()
                mp2ErrorConcrete()
            } else if(colorByChangeSelectValue === 'class') {
                mp1ClassConcrete()
                mp2ClassConcrete()
            } else {
                mp1DistancePreservation(files[6].point)
                mp2DistancePreservation(files[7].point)
            }
        } else if(datasetChangeselectValue === 'wine') {
            if(colorByChangeSelectValue === 'error') {
                mp1ErrorWine()
                mp2ErrorWine()
            } else if(colorByChangeSelectValue === 'class') {
                mp1ClassWine()
                mp2ClassWine()
            } else {
                mp1DistancePreservation(files[9].point)
                mp2DistancePreservation(files[10].point)
            }
        }
        tsneEaggTreemap.selectAll("rect").style("opacity", treemapOpacity)
        lampEaggTreemap.selectAll("rect").style("opacity", treemapOpacity)

        clickOutSidebar()
        infoPointDelete()

    }

// ativa o brush por click

    clickBrushClass = (d) => {

        let elementoIndice = globalThis.selected.indexOf(d.id);

        if(elementoIndice === -1){

            globalThis.selected.push(d.id);
            tbody.selectAll("tr").remove();

            highlightedCircleClick(d.id)
            highlightedTreemapClick(d.id)
            visaoTabularBrushClick(globalThis.selected)

        } else {

            globalThis.selected.splice(elementoIndice, 1 );
            unhighlightedCircleClassClick(d);
            unhighlightedTreemapClick(d);
            tbody.selectAll("#tr"+d.id).remove();
        }

    };

    clickBrushErrorTsne = (d) => {

        infoPointDelete()

        let elementoIndice = globalThis.selected.indexOf(d.id);

        if (elementoIndice === -1) {

            globalThis.selected.push(d.id);
            tbody.selectAll("tr").remove();
            highlightedCircleClick(d.id)
            highlightedTreemapClick(d.id)
            visaoTabularBrushClick(globalThis.selected)

            infoPointCreate(globalThis.selected)

        } else {

            globalThis.selected.splice(elementoIndice, 1 );
            unhighlightedCircleErrorTsneClick(d.id);
            unhighlightedTreemapClick(d);
            tbody.selectAll("#tr"+d.id).remove();

            if(globalThis.selected.length > 0){
                infoPointCreate(globalThis.selected)
            }
        }
    }

    clickBrushErrorLamp = (d) => {

        infoPointDelete()

        let elementoIndice = globalThis.selected.indexOf(d.id);

        if(elementoIndice === -1){

            globalThis.selected.push(d.id);
            tbody.selectAll("tr").remove();

            highlightedCircleClick(d.id)
            highlightedTreemapClick(d.id)
            visaoTabularBrushClick(globalThis.selected)

            infoPointCreate(globalThis.selected)

        } else {

            globalThis.selected.splice(elementoIndice, 1 );
            unhighlightedCircleErrorLampClick(d.id);
            unhighlightedTreemapClick(d);
            tbody.selectAll("#tr"+d.id).remove()

            if(globalThis.selected.length > 0){
                infoPointCreate(globalThis.selected)
            }
        }
    }

    function selecaoMultiplaDistance(){

        /* lamp */

        pointsFalse = []
        intersectionPointsFalse = []

        pointsTrue = []
        intersectionPointsTrue = []

        pointsMissing = []
        intersectionPointsMissing = []

        /* tsne */

        pointsFalseTsne = []
        intersectionPointsFalseTsne = []

        pointsTrueTsne = []
        intersectionPointsTrueTsne = []

        pointsMissingTsne = []
        intersectionPointsMissingTsne = []

        globalThis.selected.map((d) => {

            datasetChangeselectValue = d3.select('.selectDataset')
                .property('value')

            if (datasetChangeselectValue === 'iris'){

                files[0].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalse.push(e.id)
                    }
                })

                files[1].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalseTsne.push(e.id)
                    }
                })

                files[0].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrue.push(e.id)
                    }
                })

                files[1].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrueTsne.push(e.id)
                    }
                })

                files[0].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissing.push(e.id)
                    }
                })

                files[1].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissingTsne.push(e.id)
                    }
                })

            } else if (datasetChangeselectValue === 'segmentation'){

                files[3].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalse.push(e.id)
                    }
                })

                files[4].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalseTsne.push(e.id)
                    }
                })

                files[3].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrue.push(e.id)
                    }
                })

                files[4].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrueTsne.push(e.id)
                    }
                })

                files[3].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissing.push(e.id)
                    }
                })

                files[4].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissingTsne.push(e.id)
                    }
                })

            } else if (datasetChangeselectValue === 'concrete'){

                files[6].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalse.push(e.id)
                    }
                })

                files[7].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalseTsne.push(e.id)
                    }
                })

                files[6].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrue.push(e.id)
                    }
                })

                files[7].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrueTsne.push(e.id)
                    }
                })

                files[6].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissing.push(e.id)
                    }
                })

                files[7].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissingTsne.push(e.id)
                    }
                })

            } else if (datasetChangeselectValue === 'wine'){

                files[9].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalse.push(e.id)
                    }
                })

                files[10].point[d].eij.filter((e) => {
                    if (e.neighbor === -1) {
                        pointsFalseTsne.push(e.id)
                    }
                })

                files[9].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrue.push(e.id)
                    }
                })

                files[10].point[d].eij.filter((e) => {
                    if (e.neighbor === 0) {
                        pointsTrueTsne.push(e.id)
                    }
                })

                files[9].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissing.push(e.id)
                    }
                })

                files[10].point[d].eij.filter((e) => {
                    if (e.neighbor === 1) {
                        pointsMissingTsne.push(e.id)
                    }
                })

            }
        })

        pointsFalse = pointsFalse.sort((a,b) => a-b)
        pointsTrue = pointsTrue.sort((a,b) => a-b)
        pointsMissing = pointsMissing.sort((a,b) => a-b)

        setPointsFalse = [...new Set(pointsFalse)]
        setPointsTrue = [...new Set(pointsTrue)]
        setPointsMissing = [...new Set(pointsMissing)]

        setPointsFalse.map((d) => {
            let count = 0
            pointsFalse.filter((e) => {
                if (d === e) {
                    return count += 1
                }
            })

            if (count === globalThis.selected.length) {
                intersectionPointsFalse.push(d)
            }
        })

        setPointsTrue.map((d) => {

            let count = 0

            pointsTrue.filter((e) => {
                if (d === e) {
                    return count += 1
                }
            })

            if (count === globalThis.selected.length) {
                intersectionPointsTrue.push(d)
            }

        })

        setPointsMissing.map((d) => {

            let count = 0

            pointsMissing.filter((e) => {
                if (d === e) {
                    return count += 1
                }
            })

            if (count === globalThis.selected.length) {
                intersectionPointsMissing.push(d)
            }

        })

        /* tsne */

        pointsFalseTsne = pointsFalseTsne.sort((a,b) => a-b)
        pointsTrueTsne = pointsTrueTsne.sort((a,b) => a-b)
        pointsMissingTsne = pointsMissingTsne.sort((a,b) => a-b)

        setPointsFalseTsne = [...new Set(pointsFalseTsne)]
        setPointsTrueTsne = [...new Set(pointsTrueTsne)]
        setPointsMissingTsne = [...new Set(pointsMissingTsne)]

        setPointsFalseTsne.map((d) => {
            let count = 0
            pointsFalseTsne.filter((e) => {
                if (d === e) {
                    return count += 1
                }
            })

            if (count === globalThis.selected.length) {
                intersectionPointsFalseTsne.push(d)
            }
        })

        setPointsTrueTsne.map((d) => {

            let count = 0

            pointsTrueTsne.filter((e) => {
                if (d === e) {
                    return count += 1
                }
            })

            if (count === globalThis.selected.length) {
                intersectionPointsTrueTsne.push(d)
            }

        })

        setPointsMissingTsne.map((d) => {

            let count = 0

            pointsMissingTsne.filter((e) => {
                if (d === e) {
                    return count += 1
                }
            })

            if (count === globalThis.selected.length) {
                intersectionPointsMissingTsne.push(d)
            }
        })
    }

    clickBrushDistance = (d) => {

        /* regras para o click -

        eu não estou na casa e a casa está vazia - 1o ponto
        -- colorir segundo a vizinhança do 1o ponto

        eu não estou na casa e a casa tem gente - +1
        -- colorir segundo a intersecção dos pontos

        else

        eu estou na casa e a casa tem uma pessoa
        --remover d.id
        --remover a tabela
        --colorir de branco

        eu estou na casa e a casa tem duas pessoas
        --remover d.id
        --remover a tabela
        --colorir segundo vizinhança do 1o ponto
        --add a tabela

        eu estou na casa e a casa tem mais de duas pessoas
        --remover d.id
        -- colorir segundo a intersecção dos pontos */

        // d3.selectAll('circle').style('fill', 'white')
        //
        // datasetChangeselectValue = d3.select('.selectDataset').property('value')
        //
        // if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length < '1')){
        //
        //     globalThis.selected.push(d.id)
        //     tbody.selectAll("tr").remove()
        //     d3v4.selectAll(".pt"+d.id).raise()
        //
        //     if (datasetChangeselectValue === 'iris') {
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[0].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[1].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[0].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[1].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[0].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[1].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         d3.selectAll(".pt"+d.id)
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     } else if (datasetChangeselectValue === 'segmentation') {
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[3].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[4].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[3].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[4].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[3].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[4].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         d3.selectAll(".pt"+d.id)
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     } else if (datasetChangeselectValue === 'concrete') {
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[6].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[7].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[6].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[7].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[6].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[7].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         d3.selectAll(".pt"+d.id)
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     } else if (datasetChangeselectValue === 'wine') {
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[9].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[10].point[d.id].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[9].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[10].point[d.id].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[9].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[10].point[d.id].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         d3.selectAll(".pt"+d.id)
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     }
        //
        // } else if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length > 0)){
        //
        //     globalThis.selected.push(d.id)
        //     selecaoMultiplaDistance()
        //     tbody.selectAll("tr").remove()
        //     d3v4.selectAll(".pt"+d.id).raise()
        //
        //     if (d3.select("#checkFalse").property("checked")){
        //
        //         projMult01.selectAll("circle")
        //             .filter(a => intersectionPointsFalse.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(-1))
        //             .style("opacity",circleOpacity)
        //
        //         projMult02.selectAll("circle")
        //             .filter(a => intersectionPointsFalseTsne.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(-1))
        //             .style("opacity",circleOpacity)
        //
        //     }
        //
        //     if (d3.select("#checkTrue").property("checked")){
        //
        //         projMult01.selectAll("circle")
        //             .filter(a => intersectionPointsTrue.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(0))
        //             .style("opacity",circleOpacity)
        //
        //         projMult02.selectAll("circle")
        //             .filter(a => intersectionPointsTrueTsne.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(0))
        //             .style("opacity",circleOpacity)
        //
        //     }
        //
        //     if (d3.select("#checkMissing").property("checked")){
        //
        //         projMult01.selectAll("circle")
        //             .filter(a => intersectionPointsMissing.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(1))
        //             .style("opacity",circleOpacity)
        //
        //         projMult02.selectAll("circle")
        //             .filter(a => intersectionPointsMissingTsne.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(1))
        //             .style("opacity",circleOpacity)
        //
        //     }
        //
        //     d3.selectAll(".pt"+d.id)
        //         .attr('r', rBrush)
        //         .style("fill", circleColorBrush)
        //         .style("stroke", corBorda)
        //         .style("opacity", circleOpacity)
        //
        //     visaoTabularBrushLivre(globalThis.selected)
        //
        // } else if((globalThis.selected.indexOf(d.id) > -1) && (globalThis.selected.length === '1')){
        //
        //     globalThis.selected.splice(globalThis.selected.indexOf(d.id), 1 )
        //     tbody.selectAll("tr").remove()
        //
        //     d3.selectAll("circle")
        //         .attr("r", rPadrao)
        //         .style("fill", "white")
        //         .style("stroke", corBorda)
        //         .style("opacity", circleOpacity)
        //
        // } else if((globalThis.selected.indexOf(d.id) > -1) && (globalThis.selected.length === 2)){
        //
        //     globalThis.selected.splice(globalThis.selected.indexOf(d.id), 1 )
        //     tbody.selectAll("tr").remove()
        //
        //     if (datasetChangeselectValue === 'iris'){
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[0].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[1].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[0].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[1].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[0].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[1].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         d3.selectAll(".pt"+globalThis.selected[0])
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     } else if (datasetChangeselectValue === 'segmentation'){
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[3].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[4].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[3].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[4].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[3].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[4].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         d3.selectAll(".pt"+globalThis.selected[0])
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     } else if (datasetChangeselectValue === 'concrete'){
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[6].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[7].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[6].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[7].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[6].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[7].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         d3.selectAll(".pt"+globalThis.selected[0])
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     } else if (datasetChangeselectValue === 'wine'){
        //
        //         if (d3.select("#checkFalse").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[9].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[10].point[globalThis.selected[0]].eij[e.id].neighbor === -1)
        //                 .style("fill", () => colorScaleDistance(-1))
        //                 .style("opacity",circleOpacity)
        //
        //         }
        //
        //         if (d3.select("#checkTrue").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[9].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[10].point[globalThis.selected[0]].eij[e.id].neighbor === 0)
        //                 .style("fill", () => colorScaleDistance(0))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         if (d3.select("#checkMissing").property("checked")){
        //
        //             projMult01.selectAll("circle")
        //                 .filter(e => files[9].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //
        //             projMult02.selectAll("circle")
        //                 .filter(e => files[10].point[globalThis.selected[0]].eij[e.id].neighbor === 1)
        //                 .style("fill", () => colorScaleDistance(1))
        //                 .style("opacity",circleOpacity)
        //         }
        //
        //         d3.selectAll(".pt"+globalThis.selected[0])
        //             .attr('r', rBrush)
        //             .style("fill", circleColorBrush)
        //             .style("stroke", corBorda)
        //             .style("opacity", circleOpacity)
        //
        //         visaoTabularBrushLivre(globalThis.selected)
        //
        //     }
        //
        // } else if((globalThis.selected.indexOf(d.id) > -1) && (globalThis.selected.length > 2)){
        //
        //     globalThis.selected.splice(globalThis.selected.indexOf(d.id), 1 )
        //     tbody.selectAll("tr").remove()
        //     selecaoMultiplaDistance()
        //
        //     if (d3.select("#checkFalse").property("checked")){
        //
        //         projMult01.selectAll("circle")
        //             .filter(a => intersectionPointsFalse.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(-1))
        //             .style("opacity",circleOpacity)
        //
        //         projMult02.selectAll("circle")
        //             .filter(a => intersectionPointsFalseTsne.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(-1))
        //             .style("opacity",circleOpacity)
        //
        //     }
        //
        //     if (d3.select("#checkTrue").property("checked")){
        //
        //         projMult01.selectAll("circle")
        //             .filter(a => intersectionPointsTrue.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(0))
        //             .style("opacity",circleOpacity)
        //
        //         projMult02.selectAll("circle")
        //             .filter(a => intersectionPointsTrueTsne.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(0))
        //             .style("opacity",circleOpacity)
        //
        //     }
        //
        //     if (d3.select("#checkMissing").property("checked")){
        //
        //         projMult01.selectAll("circle")
        //             .filter(a => intersectionPointsMissing.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(1))
        //             .style("opacity",circleOpacity)
        //
        //         projMult02.selectAll("circle")
        //             .filter(a => intersectionPointsMissingTsne.indexOf(a.id) > -1)
        //             .style("fill", () => colorScaleDistance(1))
        //             .style("opacity",circleOpacity)
        //     }
        //
        //     d3.selectAll(".pt"+d.id)
        //         .attr('r', rBrush)
        //         .style("fill", circleColorBrush)
        //         .style("stroke", corBorda)
        //         .style("opacity", circleOpacity)
        //
        //     visaoTabularBrushLivre(globalThis.selected)
        // }


        if(sessionStorage.getItem('mouseoverLabelValue') === 'yes'){
            divClass.transition().duration(100).style("opacity", '1')
        }

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        const colorsFalse = colorbrewer.Oranges[4]
        const colorsTrue = '#f7f7f7'
        const colorsMissing = colorbrewer.Purples[4]

        const valueFTM = -0.10

        d3v4.selectAll(".pt"+d.id).raise()

        if(language === 'en'){

            divClass.html("Id: " + (d.id) + "<br/>" + "Class: " + d.class)
                .style("left", (d3.event.pageX - 120) + "px")
                .style("top", (d3.event.pageY - 65) + "px")

        } else if (language === 'ptbr') {

            divClass.html("Id: " + (d.id) + "<br/>" + "Classe: " + d.class)
                .style("left", (d3.event.pageX - 120) + "px")
                .style("top", (d3.event.pageY - 65) + "px")
        }

        tbody.selectAll("tr").remove()
        visaoTabularMouseover(d.id);

        if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length < '1')){

            globalThis.selected.push(d.id)
            // tbody.selectAll("tr").remove()
            d3v4.selectAll(".pt"+d.id).raise()

            if (datasetChangeselectValue === 'iris') {

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampIris = d3v5.min(files[0].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampIris = d3v5.max(files[0].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampIris = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampIris, maxFalseDistancelampIris])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[0].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampIris(files[0].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneIris = d3v5.min(files[1].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneIris = d3v5.max(files[1].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneIris = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneIris, maxFalseDistanceTsneIris])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[1].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneIris(files[1].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampIris = d3v5.min(files[0].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampIris = d3v5.max(files[0].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampIris = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampIris, maxTrueDistancelampIris])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[0].point[d.id].eij[e.id].error >= valueFTM && files[0].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampIris(files[0].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneIris = d3v5.min(files[1].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneIris = d3v5.max(files[1].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneIris = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneIris, maxTrueDistanceTsneIris])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[1].point[d.id].eij[e.id].error >= -0.10 && files[1].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneIris(files[1].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampIris = d3v5.min(files[0].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampIris = d3v5.max(files[0].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampIris = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampIris, maxMissingDistancelampIris])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[0].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampIris(files[0].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneIris = d3v5.min(files[1].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneIris = d3v5.max(files[1].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneIris = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneIris, maxMissingDistanceTsneIris])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[1].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneIris(files[1].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'segmentation'){

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampSeg = d3v5.min(files[3].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampSeg = d3v5.max(files[3].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampSeg = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampSeg, maxFalseDistancelampSeg])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[3].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampSeg(files[3].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneSeg = d3v5.min(files[4].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneSeg = d3v5.max(files[4].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneSeg = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneSeg, maxFalseDistanceTsneSeg])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[4].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneSeg(files[4].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampSeg = d3v5.min(files[3].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampSeg = d3v5.max(files[3].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampSeg = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampSeg, maxTrueDistancelampSeg])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[3].point[d.id].eij[e.id].error >= valueFTM && files[3].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampSeg(files[3].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneSeg = d3v5.min(files[4].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneSeg = d3v5.max(files[4].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneSeg = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneSeg, maxTrueDistanceTsneSeg])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[4].point[d.id].eij[e.id].error >= -0.10 && files[4].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneSeg(files[4].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampSeg = d3v5.min(files[3].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampSeg = d3v5.max(files[3].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampSeg = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampSeg, maxMissingDistancelampSeg])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[3].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampSeg(files[3].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneSeg = d3v5.min(files[4].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneSeg = d3v5.max(files[4].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneSeg = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneSeg, maxMissingDistanceTsneSeg])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[4].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneSeg(files[4].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'concrete'){

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampConcrete = d3v5.min(files[6].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampConcrete = d3v5.max(files[6].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampConcrete = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampConcrete, maxFalseDistancelampConcrete])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[6].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampConcrete(files[6].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneConcrete = d3v5.min(files[7].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneConcrete = d3v5.max(files[7].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneConcrete = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneConcrete, maxFalseDistanceTsneConcrete])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[7].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneConcrete(files[7].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampConcrete = d3v5.min(files[6].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampConcrete = d3v5.max(files[6].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampConcrete = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampConcrete, maxTrueDistancelampConcrete])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[6].point[d.id].eij[e.id].error >= valueFTM && files[6].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampConcrete(files[6].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneConcrete = d3v5.min(files[7].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneConcrete = d3v5.max(files[7].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneConcrete = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneConcrete, maxTrueDistanceTsneConcrete])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[7].point[d.id].eij[e.id].error >= -0.10 && files[7].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneConcrete(files[7].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampConcrete = d3v5.min(files[6].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampConcrete = d3v5.max(files[6].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampConcrete = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampConcrete, maxMissingDistancelampConcrete])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[6].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampConcrete(files[6].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneConcrete = d3v5.min(files[7].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneConcrete = d3v5.max(files[7].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneConcrete = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneConcrete, maxMissingDistanceTsneConcrete])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[7].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneConcrete(files[7].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            } else if (datasetChangeselectValue === 'wine'){

                if (d3.select("#checkFalse").property("checked")){

                    let minFalseDistanceLampWine = d3v5.min(files[9].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistancelampWine = d3v5.max(files[9].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseLampWine = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceLampWine, maxFalseDistancelampWine])
                        .range(colorsFalse)

                    projMult01.selectAll("circle")
                        .filter(e => files[9].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseLampWine(files[9].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minFalseDistanceTsneWine = d3v5.min(files[10].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let maxFalseDistanceTsneWine = d3v5.max(files[10].point[d.id].eij, e => {
                        if (e.error < valueFTM){return e.error}})

                    let colorScaleDistanceFalseTsneWine = d3v5.scaleOrdinal()
                        .domain([minFalseDistanceTsneWine, maxFalseDistanceTsneWine])
                        .range(colorsFalse)

                    projMult02.selectAll("circle")
                        .filter(e => files[10].point[d.id].eij[e.id].error < valueFTM)
                        .style("fill", (e) => colorScaleDistanceFalseTsneWine(files[10].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)
                }

                if (d3.select("#checkTrue").property("checked")){

                    let minTrueDistanceLampWine = d3v5.min(files[9].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistancelampWine = d3v5.max(files[9].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueLampWine = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceLampWine, maxTrueDistancelampWine])
                        .range(colorsTrue)

                    projMult01.selectAll("circle")
                        .filter(e => files[9].point[d.id].eij[e.id].error >= valueFTM && files[9].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueLampWine(files[9].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)

                    let minTrueDistanceTsneWine = d3v5.min(files[10].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let maxTrueDistanceTsneWine = d3v5.max(files[10].point[d.id].eij, e => {
                        if ((e.error >= valueFTM) && (e.error <= (valueFTM * -1))){return e.error}})

                    let colorScaleDistanceTrueTsneWine = d3v5.scaleOrdinal()
                        .domain([minTrueDistanceTsneWine, maxTrueDistanceTsneWine])
                        .range(colorsTrue)

                    projMult02.selectAll("circle")
                        .filter(e => files[10].point[d.id].eij[e.id].error >= -0.10 && files[10].point[d.id].eij[e.id].error <= (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceTrueTsneWine(files[10].point[d.id].eij[e.id].error))
                        .style("opacity",circleOpacity)
                }

                if (d3.select("#checkMissing").property("checked")){

                    let minMissingDistanceLampWine = d3v5.min(files[9].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistancelampWine = d3v5.max(files[9].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingLampWine = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceLampWine, maxMissingDistancelampWine])
                        .range(colorsMissing)

                    projMult01.selectAll("circle")
                        .filter(e => files[9].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingLampWine(files[9].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                    let minMissingDistanceTsneWine = d3v5.min(files[10].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let maxMissingDistanceTsneWine = d3v5.max(files[10].point[d.id].eij, e => {
                        if (e.error > (valueFTM * -1)){return e.error}})

                    let colorScaleDistanceMissingTsneWine = d3v5.scaleOrdinal()
                        .domain([minMissingDistanceTsneWine, maxMissingDistanceTsneWine])
                        .range(colorsMissing)

                    projMult02.selectAll("circle")
                        .filter(e => files[10].point[d.id].eij[e.id].error > (valueFTM * -1))
                        .style("fill", (e) => colorScaleDistanceMissingTsneWine(files[10].point[d.id].eij[e.id].error))
                        .style("opacity", circleOpacity)

                }

                d3.selectAll(".pt"+d.id)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

            }

        } else if((globalThis.selected.indexOf(d.id) === -1) && (globalThis.selected.length > '0')){

            d3.selectAll(".pt"+d.id)
                .attr('r', rBrush)
                .style("fill", circleColorBrush)
                .style("stroke", corBorda)
                .style("opacity", circleOpacity)

        } else if (globalThis.selected.indexOf(d.id) > -1) {

            d3.selectAll(".pt"+d.id)
                .style("stroke", corBorda)
                .style('stroke-width', '1')

        }
    }

///////////////click treemap////////////////

    clickBrushTreemapLamp = (d) => {

        infoPointDelete()

        let elementoIndice = globalThis.selected.indexOf(d.data.name);

        if(elementoIndice === -1){

            globalThis.selected.push(d.data.name);
            tbody.selectAll("tr").remove();

            highlightedCircleClick(d.data.name)
            highlightedTreemapClick(d.data.name)
            visaoTabularBrushClick(globalThis.selected)

            infoPointCreate(globalThis.selected)

        } else {
            globalThis.selected.splice(elementoIndice, 1 );
            unhighlightedCircleErrorLamp(d.data.name);
            unhighlightedTreemapClick(d.data);
            tbody.selectAll("#tr"+d.data.name).remove()

            if(globalThis.selected.length > 0){
                infoPointCreate(globalThis.selected)
            }
        }
    }

    clickBrushTreemapDistanceLamp = (d) => {

        infoPointDelete()

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if(globalThis.selected.indexOf(d.data.name) === -1){

            globalThis.selected.push(d.data.name);
            tbody.selectAll("tr").remove();
            d3v4.selectAll(".pt"+d.data.name).raise();

            infoPointCreate(globalThis.selected)

            if (datasetChangeselectValue === 'iris') {

                projMult01.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[0].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            } else if (datasetChangeselectValue === 'segmentation') {

                projMult01.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[3].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            } else if (datasetChangeselectValue === 'concrete') {

                projMult01.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[6].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            } else if (datasetChangeselectValue === 'wine') {

                projMult01.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[9].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            }

        } else {

            globalThis.selected.splice(globalThis.selected.indexOf(d.data.name), 1 );

            d3.selectAll("circle")
                .style("fill", "white")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("opacity", circleOpacity)

            unhighlightedTreemapClick(d.data);
            tbody.selectAll("#tr"+d.data.name).remove();
        }
    }

    clickBrushTreemapTsne = (d) => {

        infoPointDelete()

        let elementoIndice = globalThis.selected.indexOf(d.data.name);

        if(elementoIndice === -1){

            globalThis.selected.push(d.data.name);
            tbody.selectAll("tr").remove();

            highlightedCircleClick(d.data.name)
            highlightedTreemapClick(d.data.name)
            visaoTabularBrushClick(globalThis.selected)

            infoPointCreate(globalThis.selected)

        } else {

            globalThis.selected.splice(elementoIndice, 1 );
            unhighlightedCircleErrorTsne(d.data.name);
            unhighlightedTreemapClick(d.data);
            tbody.selectAll("#tr"+d.data.name).remove()

            if(globalThis.selected.length > 0){
                infoPointCreate(globalThis.selected)
            }
        }
    }

    clickBrushTreemapDistanceTsne = (d) => {

        infoPointDelete()

        datasetChangeselectValue = d3.select('.selectDataset').property('value')

        if(globalThis.selected.indexOf(d.data.name) === -1){

            globalThis.selected.push(d.data.name);
            tbody.selectAll("tr").remove();
            d3v4.selectAll(".pt"+d.data.name).raise()

            infoPointCreate(globalThis.selected)

            if (datasetChangeselectValue === 'iris') {

                projMult02.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[1].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            } else if (datasetChangeselectValue === 'segmentation') {

                projMult02.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[4].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            } else if (datasetChangeselectValue === 'concrete') {

                projMult02.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[7].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            } else if (datasetChangeselectValue === 'wine') {

                projMult02.selectAll("circle")
                    .style("fill", (e) => colorScaleDistance(files[10].point[d.data.name].eij[e.id].neighbor))
                    .style("opacity", circleOpacity)

                d3.selectAll(".pt"+d.data.name)
                    .attr('r', rBrush)
                    .style("fill", circleColorBrush)
                    .style("stroke", corBorda)
                    .style("opacity", circleOpacity)

                highlightedTreemapClick(d.data.name)

                visaoTabularBrushLivre(globalThis.selected)

            }

        } else {

            globalThis.selected.splice(globalThis.selected.indexOf(d.data.name), 1 );

            d3.selectAll("circle")
                .style("fill", "white")
                .attr("r", rPadrao)
                .style("stroke", corBorda)
                .style("opacity", circleOpacity)

            unhighlightedTreemapClick(d.data);
            tbody.selectAll("#tr"+d.data.name).remove()

            if(globalThis.selected.length > 0){
                infoPointCreate(globalThis.selected)
            }
        }
    }

    clickTreemapLamp = (d) => {

        let elementoIndice = globalThis.selected.indexOf(d.data.name);

        infoPointDelete()

        if(elementoIndice === -1){

            globalThis.selected.push(d.data.name);
            highlightedCircleClick(d.data.name);
            highlightedTreemapClick(d.data.name)

            infoPointCreate(globalThis.selected)

        } else {

            globalThis.selected.splice(elementoIndice, 1 );
            unhighlightedCircleErrorLamp(d.data.name);
            highlightedTreemapClick(d.data.name)
            tbody.selectAll("#tr"+d.data.name).remove()

            if(globalThis.selected.length > 0){
                infoPointCreate(globalThis.selected)
            }

        }
    }

    clickTreemapTsne = (d) => {

        infoPointDelete()

        let elementoIndice = globalThis.selected.indexOf(d.data.name);

        if(elementoIndice === -1){

            globalThis.selected.push(d.data.name);
            highlightedCircleClick(d.data.name);
            highlightedTreemapClick(d.data.name)

            infoPointCreate(globalThis.selected)

        } else {

            globalThis.selected.splice(elementoIndice, 1 );
            unhighlightedCircleErrorTsne(d.data.name);
            highlightedTreemapClick(d.data.name)
            tbody.selectAll("#tr"+d.data.name).remove()

            if(globalThis.selected.length > 0){
                infoPointCreate(globalThis.selected)
            }
        }
    }

    function clickOutSidebar() {

        d3.select('.sideBarLeft')
            .transition()
            .duration(800)
            .style("visibility", "invisible")
            .style("opacity", 0)
            .style('width', '0px')

        d3.select('.sideBarRight')
            .transition()
            .duration(800)
            .style("visibility", "invisible")
            .style("opacity", 0)
            .style('width', '0px')
    }

    function datasetInfo_(){

        datasetChangeselectValue = d3v4.select('.selectDataset').property('value')

        if (datasetChangeselectValue === 'iris') {

            if(language === 'en'){

                d3v4.select('.datasetInfo')
                    .html("<b>Dataset Name:</b> Íris<br><b>Records:</b> 147 | <b>Attributes:</b> 6")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }else if(language === 'ptbr'){

                d3v4.select('.datasetInfo')
                    .html("<b>Nome da Base de Dados:</b> Íris<br><b>Registros:</b> 147 | <b>Atributos:</b> 6")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }

        } else if (datasetChangeselectValue === 'segmentation') {

            if(language === 'en'){

                d3v4.select('.datasetInfo')
                    .html("<b>Dataset Name:</b> Segmentation<br><b>Records:</b> 2100 | <b>Attributes:</b> 21")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }else if(language === 'ptbr'){

                d3v4.select('.datasetInfo')
                    .html("<b>Nome da Base de Dados:</b> Segmentation<br><b>Registros:</b> 2100 | <b>Atributos:</b> 21")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }

        } else if (datasetChangeselectValue === 'concrete') {

            if(language === 'en'){

                d3v4.select('.datasetInfo')
                    .html("<b>Dataset Name:</b> Wifi<br><b>Records:</b> 2000 | <b>Attributes:</b> 9")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }else if(language === 'ptbr'){

                d3v4.select('.datasetInfo')
                    .html("<b>Nome da Base de Dados:</b> Wifi<br><b>Registros:</b> 2000 | <b>Atributos:</b> 9")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }

        } else if (datasetChangeselectValue === 'wine') {

            if(language === 'en'){

                d3v4.select('.datasetInfo')
                    .html("<b>Dataset Name:</b> Wine<br><b>Records:</b> 178 | <b>Attributes:</b> 14")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }else if(language === 'ptbr'){

                d3v4.select('.datasetInfo')
                    .html("<b>Nome da Base de Dados:</b> Vinho<br><b>Registros:</b> 178 | <b>Atributos:</b> 14")
                    .style('text-align', 'center')
                    .style('font-size', '12')
                    .style('font-family', 'Arial')

            }

        }
    }
    datasetInfo_()

    d3.select('#projMult01Rect').on('click', removeBrush)

    d3.select('#projMult02Rect').on('click', removeBrush)

    /* inicialização */

    // mp1ErrorSeg()
    // sliderLampMp()
    // legendaEagg(corEaggSeg)
    // mp2ErrorSeg()
    // sliderTsneMp()
    // lampEaggTreemapSeg()
    // legendTreemap(corEaggSeg)
    // tsneEaggTreemapSeg()
    // criarPaletaError()

    mp1ErrorWine()
    sliderLampMp()
    legendaEagg(corEaggSeg)
    mp2ErrorWine()
    sliderTsneMp()
    lampEaggTreemapWine()
    legendTreemap(corEaggWine)
    tsneEaggTreemapWine()
    criarPaletaError()

})