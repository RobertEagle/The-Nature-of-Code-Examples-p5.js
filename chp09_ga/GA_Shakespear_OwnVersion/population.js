function Population(_targetPhrase, _mutationRate, popSize) {
    this.population = [];
    this.generations = 0;
    this.finished = false;
    this.target = _targetPhrase;
    this.mutationRate = _mutationRate;
    this.perfectScore = 1;
    this.best = "";
    this.maxFitness = 0;

    for (var i = 0; i < popSize; i++) {
        this.population[i] = new DNA(this.target.length);
    }

    this.calcFitness = function() {
        this.maxFitness = 0;
        for (var i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(this.target);
            if(this.population[i].fitness > this.maxFitness)
              this.maxFitness = this.population[i].fitness;
        }
    };
    this.calcFitness();

    this.acceptReject = function() {
        while (true) {
            var index = floor(random(this.population.length));
            var partner = this.population[index];
            var rfit = random(this.maxFitness);
            if (rfit < partner.fitness)
                return partner;
        }
    };

    this.nextGeneration = function() {
        var newGeneration = [];

        for (var i = 0; i < this.population.length; i++) {
            var partnerA = this.acceptReject();
            var partnerB = this.acceptReject();
            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);

            newGeneration[i] = child;
        }

        this.population = newGeneration;
        this.generations++;
    };

    this.getBest = function() {
        return this.best;
    };

    this.evaluate = function() {
        var bestScore = 0.0;
        var index = 0;

        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > bestScore) {
                bestScore = this.population[i].fitness;
                index = i;
            }
        }

        this.best = this.population[index].getPhrase();
        if (bestScore == this.perfectScore) {
            this.finished = true;
        }
    };

    this.isFinished = function() {
        return this.finished;
    };

    this.getGenerations = function() {
        return this.generations;
    };

    this.getAverageFitness = function() {
        total = 0;
        for (var i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }

        return total / this.population.length;
    };

    this.allPhrases = function() {
        var everything = "";
        var displayLimit = min(this.population.length, 50);

        for (var i = 0; i < displayLimit; i++) {
            everything += this.population[i].getPhrase() + "<br>";
        }

        return everything;
    };

    this.size = function() {
      return this.population.length;
    };

    this.creatureAt = function(i) {
      return this.population[i];
    };
}
