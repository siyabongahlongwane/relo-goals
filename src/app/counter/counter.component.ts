import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  constructor() {}
  timeUntilAnn: string | undefined;
  ngOnInit(): void {
    this.dateBeforeAnniversary();
  }

  dateBeforeAnniversary() {
    // The data/time we want to countdown to
    var countDownDate = new Date('May 21, 2023 00:00:00').getTime();

    // Run myfunc every second
    var myfunc = setInterval( ():any => {
      var now = new Date().getTime();
      var timeleft = countDownDate - now;

      // Calculating the days, hours, minutes and seconds left
      var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        console.log(timeleft);
      // Result is output to the specific element
      if(timeleft > 0){
        this.timeUntilAnn =  days + 'd ' +hours + 'h ' +minutes + 'm ' +seconds + 's ';
        return this.timeUntilAnn;
      }
      // Display the message when countdown is over
      else if (timeleft < 0) {
        clearInterval(myfunc);
        this.timeUntilAnn = 'Happy 1st Anniversary Karabo and Siyabonga! ❤	❤	❤	';
        return this.timeUntilAnn;
      }
    }, 1000);
  }
}
