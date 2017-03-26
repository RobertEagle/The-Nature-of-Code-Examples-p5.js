function newChar() {
    var c = floor(random(63, 123));
    if (c === 63) c = 32;
    if (c === 64) c = 46;

    return String.fromCharCode(c);
}

function DNA(length) {
    this.genes = [];
    this.fitness = 0;

    for (var i = 0; i < length; i++) {
        this.genes[i] = newChar();
    }

    this.getPhrase = function() {
        return this.genes.join("");
    };

    this.calcFitness = function(target) {
        /*var score = 0;
        for (var i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target.charAt(i)) {
                score++;
              }
        }

        this.fitness = score / target.length;*/

       var score = 0.001;
       var factor = 1;
       for (var i = 0; i < this.genes.length; i++) {
         var gene = this.getPhrase().charCodeAt(i);
         var targetGene = target.charCodeAt(i);
         var similarity = abs(targetGene - gene);
         score += 60 - similarity;

         if (this.genes[i] == target.charAt(i)) {
           factor++;
         }
       }

       if(factor == target.length + 1) this.fitness = 1;
       else this.fitness = (score * factor / target.length) / (60 * target.length);
    };

    this.crossover = function(partner) {
        var child = new DNA(this.genes.length);

        var midpoint = floor(random(1, this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (i < midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }

        return child;
    };

    this.mutate = function(mutationRate) {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < mutationRate)
                this.genes[i] = newChar();
        }
    };
}
