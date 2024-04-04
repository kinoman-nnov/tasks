class LiveTimer extends HTMLElement {

  connectedCallback() {
    const timeFormattedElem = document.createElement('time-formatted');

    const attrsArr = ['hour', 'minute', 'second'];

    for (const item of attrsArr) {
      timeFormattedElem.setAttribute(item, 'numeric');
    }

    this.timer = setInterval(() => this.updateTime(), 1000);

    this.append(timeFormattedElem);

    this.timeFormattedElem = timeFormattedElem;
  }

  updateTime() {
    this.date = new Date();

    this.timeFormattedElem.setAttribute('datetime', this.date);

    this.timeFormattedElem.dispatchEvent(new CustomEvent("tick", {
      detail: this.date,
      bubbles: true
    }));
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

}

customElements.define("live-timer", LiveTimer);


// вариант learnJs

// class LiveTimer extends HTMLElement {

//   render() {
//     this.innerHTML = `
//     <time-formatted hour="numeric" minute="numeric" second="numeric">
//     </time-formatted>
//     `;

//     this.timerElem = this.firstElementChild;
//   }

//   connectedCallback() { // (2)
//     if (!this.rendered) {
//       this.render();
//       this.rendered = true;
//     }
//     this.timer = setInterval(() => this.update(), 1000);
//   }

//   update() {
//     this.date = new Date();
//     this.timerElem.setAttribute('datetime', this.date);
//     this.dispatchEvent(new CustomEvent('tick', { detail: this.date }));
//   }

//   disconnectedCallback() {
//     clearInterval(this.timer); // важно, чтобы элемент мог быть собранным сборщиком мусора
//   }

// }

// customElements.define("live-timer", LiveTimer);