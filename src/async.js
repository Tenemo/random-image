let batchId = 0;
function addToQueue(pictures) {
    console.log('------------------------------------');
    console.log(
        `ADDED TO QUEUE ${pictures.length} PICTURES! Batch #${batchId}`,
    );
    console.log(pictures.join(';'));
    console.log('------------------------------------');
    batchId += 1;
}

const buffer = {
    pictures: [],
    batchNumber: 0,
    add(pictureName) {
        this.pictures.push(pictureName);
        console.log(
            `New pic, yoo ${pictureName}. ${
                this.pictures.length
            } pictures in current batch.`,
        );
        if (this.pictures.length === 1) {
            // new request! fresh buffer! start the fucking countdown
            this.startTimer(this.batchNumber);
        }
        if (this.pictures.length === 5) {
            // full buffer! unleash the hounds
            console.log('MAX LIMIT OF PICTURES');
            this.send();
        }
    },
    startTimer(currentNumber) {
        console.log('Empty batch! Starting timer!');
        setTimeout(() => {
            // console.log(
            //     `Timer ended! batchNumber: ${
            //         this.batchNumber
            //     } currentNumber: ${currentNumber}`,
            // );
            if (this.batchNumber === currentNumber) {
                console.log('TIMEOUT FIRED!!!!!!!!!!!');
                this.send();
            }
        }, 5000);
    },
    send() {
        // console.log(
        //     `SENDING PICTURES BITCH ${
        //         this.pictures.length
        //     } pictures in current batch.`,
        // );
        this.batchNumber += 1;
        addToQueue(this.pictures);
        this.clear(); // this should be in a callback, in case sending pictures to queue fucks up
    },
    clear() {
        this.pictures = [];
    },
};

function syncTimer(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function stressTestingMotherfuckers() {
    for (let i = 0; i < 999; ) {
        await syncTimer(500); // eslint-disable-line no-await-in-loop
        if (Math.random() < 0.45) {
            i += 1;
            buffer.add(`${i}_picture`);
        }
    }
}
console.clear();
stressTestingMotherfuckers();
