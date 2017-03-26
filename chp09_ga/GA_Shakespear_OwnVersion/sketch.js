var bestPhrase;
var allPhrases;
var stats;
var graphText;

var graphHeight;
var graphWidth;
var percentagePrecision;

var target;
var popmax;
var mutationRate;
var population;

var firstRun = true;

function setup() {
    bestPhrase = createP("Best phrase: ");
    bestPhrase.class("best");
    bestPhrase.position(10,0);

    allPhrases = createP("All phrases: ");
    allPhrases.position(600, 10);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.class("stats");
    stats.position(10, 250);

    graphText = createP("fitness distribution: ");
    graphText.class("graph");
    graphText.position(10, 450);

    graphHeight = 400;
    graphWidth = 400;
    percentagePrecision = 1;
    target = "To be or not to be.";
    popmax = 200;
    mutationRate = 0.01;

    createCanvas(graphWidth,graphHeight).position(0,520);

    population = new Population(target, mutationRate, popmax);
}

function draw() {

    if(firstRun) {
      noLoop();
      firstRun = false;
    }

    population.nextGeneration();

    population.calcFitness();

    population.evaluate();

    if (population.isFinished()) {
      noLoop();
    }

    displayInfo();
    drawGraph(population, graphWidth, graphHeight, percentagePrecision);
}

function displayInfo() {
    var answer = population.getBest();
    bestPhrase.html("Best phrase:<br>" + answer);

    var statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:      " + popmax + "<br>";
    statstext += "mutation rate:         " + floor(population.mutationRate * 100) + "%";

    stats.html(statstext);

    allPhrases.html("All phrases:<br>" + population.allPhrases());
}

function mousePressed() {
  loop();
}

function mouseReleased() {
  noLoop();
}
