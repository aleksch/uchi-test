
class Question {
    constructor(firstArgument, secondArgument) {
        if (!firstArgument || !secondArgument) {
            this.generateArgument();
        } else {
            this.firstArg = firstArgument;
            this.secondArg = secondArgument;
        }

        this.answer = Number(this.firstArg) + Number(this.secondArg);
        this.initElements();
        this.renderArgument();
    }

    initElements() {
        this.firstArgElement = $('#first-argument');
        this.secondArgElement = $('#second-argument');
        this.answerElement = $('#answer');
    }

    generateArgument() {
        let randomInteger = (min, max) => {
            let rand = min - 0.5 + Math.random() * (max - min + 1)

            return Math.round(rand);
        }

        this.firstArg = randomInteger(6, 9);
        this.secondArg = randomInteger(2, 5);
    }

    renderArgument() {
        this.firstArgElement.text(this.firstArg);
        this.secondArgElement.text(this.secondArg);
    }

    renderInput() {
        this.answerElement.find('.q').hide();
        this.answerElement.find('.answer-input').show();
    }

    validateInput(callback) {
        let answer = this.answer;
        let input = this.answerElement.find('.answer-input');
        input.focus();
        input.keyup(function () {
            let val = $(this).val();
            if (val == answer) {
                $(this).css('color', 'black');
                $(this).unbind('keyup');
                $(this).attr('disabled', 'disabled');
                $(this).addClass('is-number big');
                callback();
            } else {
                $(this).css('color', 'red');
            }
        });
    }
}

class Arrow {
    constructor(elementContainer, fromPosition, stepSize) {
        this.elementContainer = elementContainer;
        
        this.fromPos = fromPosition;
        this.toPos = fromPosition + stepSize;
        this.stepSize = stepSize;

        this.initElements();
        this.renderArrow();
    }

    initElements() {
        this.firstSmallArrow = $('#ar-first-line');
        this.secondSmallArrow = $('#ar-second-line');
        this.numberInQuestionElement = $('#second-argument');
        if (this.fromPos === 0) {
            this.firstSmallArrow = $('#ar2-first-line');
            this.secondSmallArrow = $('#ar2-second-line');
            this.numberInQuestionElement = $('#first-argument');
        }
        this.arrowInput = $('#' + this.elementContainer.attr('id') + '-answer');
    }

    renderArrow() {
        let rx = this.stepSize * 19.3;
        let cx = (this.fromPos * 19.5 + (this.stepSize * 19.5 / 2)) * 2 + 2;
        let ry = this.stepSize * 10

        let arrowLineCoord = {
            fromX: cx + rx,
            ffromY: 200,
            toFirstX1: cx + rx - 9,
            toFirstY12: 190,
            toSecondX1: cx + rx + this.stepSize / 2,
            toSecondY2: 187
        }

        this.renderSmallArrow(arrowLineCoord);

        this.elementContainer.css('cx', cx);
        this.elementContainer.css('rx', rx);
        this.elementContainer.css('ry', ry);

        this.arrowInput.css('left', cx - 15 + 'px');
        this.arrowInput.css('bottom', ry + 15 + 'px');

        this.elementContainer.show();
        this.elementContainer.find('input').show();
    }

    renderSmallArrow(coords) {
        this.firstSmallArrow.attr({
            x1: coords.fromX,
            x2: coords.toFirstX1
        });
        this.secondSmallArrow.attr({
            x1: coords.fromX,
            x2: coords.toSecondX1
        });
    }

    hideElement() {
        this.elementContainer.hide();
        this.firstSmallArrow.hide();
        this.secondSmallArrow.hide();
        this.arrowInput.hide();
    }

    showElement() {
        this.elementContainer.show();
        this.firstSmallArrow.show();
        this.secondSmallArrow.show();
        this.arrowInput.show();
    }

    validateInput(input, callback) {
        let question = this.numberInQuestionElement;
        input.focus();
        input.keyup(function () {
            let val = $(this).val();
            if (val == question.text()) {
                question.css('background-color', 'white');
                $(this).css('color', 'black');
                $(this).unbind('keyup');
                $(this).attr('disabled', 'disabled');
                $(this).addClass('is-number');
                callback();
            } else {
                question.css('background-color', 'yellow');
                $(this).css('color', 'red');
            }
        });
    }
}

$(document).ready(function () {
    const question = new Question();
    const firstArrow = new Arrow($('#first-arrow'), 0, question.firstArg);
    const secondArrow = new Arrow($('#second-arrow'), question.firstArg, question.secondArg);

    secondArrow.hideElement();
    
    firstArrow.validateInput(firstArrow.arrowInput, nextStep)

    function nextStep() {
        secondArrow.showElement();
        secondArrow.validateInput(secondArrow.arrowInput, finishStep)
    }

    function finishStep() {
        question.renderInput();
        question.validateInput(() => {});
    }

});


