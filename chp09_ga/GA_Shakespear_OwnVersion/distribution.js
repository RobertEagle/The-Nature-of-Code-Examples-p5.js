function getPopulationWin(population, min_fitness, max_fitness) {
    var selectedPop = 0;

    for (var i = 0; i < population.size(); i++) {
        fitness = population.creatureAt(i).fitness;
        if (fitness > min_fitness && fitness <= max_fitness)
            selectedPop++;
    }
    return selectedPop / population.size();
}

function drawGraph(population, width, height, percentagePrecision) {
    background(255);
    stroke(140);
    line(0, height, 0, 0);
    line(width, height, width - 3, 0);
    line(0, height - 1, width, height);

    var dist_array = [];
    var max_percent = 0;
    var amp_factor = 1;

    for (var i = 0; i <= 100 - percentagePrecision; i += percentagePrecision) {
        var new_percentage = getPopulationWin(population, i / 100, (i + percentagePrecision) / 100);
        dist_array.push(new_percentage);
        if(max_percent < new_percentage) {
          max_percent = new_percentage;
        }
    }
    amp_factor = 1 / max_percent;

    var pixelsPerBar = floor(width / (100 / percentagePrecision));
    var index = -1;
    for (i = 0; i < width; i++) {
        if (i % pixelsPerBar === 0) {
            index++;
        }
        line(i, height, i, height * (1 - dist_array[index] * amp_factor));
    }
}
