import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-votes-heatmap',
  templateUrl: './votes-heatmap.component.html',
  styleUrls: ['./votes-heatmap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotesHeatmapComponent implements OnInit {

  // Data for heatmap
  //dataSource: number[][]=[] ;

  dataSource: number[][] = [
      [73, 39, 26, 39, 94, 0, 73, 39, 26, 39, 94, 0, ],
      [93, 58, 53, 38, 26, 68, 73, 39, 26, 39, 94, 0,],
      [99, 28, 22, 4, 66, 90, 73, 39, 26, 39, 94, 0, ],
      [14, 26, 97, 69, 69, 3, 73, 39, 26, 39, 94, 0, ],
      [7, 46, 47, 47, 88, 6, 73, 39, 26, 39, 94, 0,],
      [41, 55, 73, 23, 3, 79, 73, 39, 26, 39, 94, 0,],
      [56, 69, 21, 86, 3, 33, 73, 39, 26, 39, 94, 0,],
      [45, 7, 53, 81, 95, 79, 73, 39, 26, 39, 94, 0,],
      [60, 77, 74, 68, 88, 51, 73, 39, 26, 39, 94, 0,],
      [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
      [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
      [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
      [73, 39, 26, 39, 94, 0, 73, 39, 26, 39, 94, 0, ],
      [93, 58, 53, 38, 26, 68, 73, 39, 26, 39, 94, 0,],
      [99, 28, 22, 4, 66, 90, 73, 39, 26, 39, 94, 0, ],
      [14, 26, 97, 69, 69, 3, 73, 39, 26, 39, 94, 0, ],
      [7, 46, 47, 47, 88, 6, 73, 39, 26, 39, 94, 0,],
      [41, 55, 73, 23, 3, 79, 73, 39, 26, 39, 94, 0,],
      [56, 69, 21, 86, 3, 33, 73, 39, 26, 39, 94, 0,],
      [45, 7, 53, 81, 95, 79, 73, 39, 26, 39, 94, 0,],
      [60, 77, 74, 68, 88, 51, 73, 39, 26, 39, 94, 0,],
      [50, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
      [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
      [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
      [73, 39, 26, 39, 94, 0, 73, 39, 26, 39, 94, 0, ],
      [93, 58, 53, 38, 26, 68, 73, 39, 26, 39, 94, 0,],
      [99, 28, 22, 4, 66, 90, 73, 39, 26, 39, 94, 0, ],
      [14, 26, 97, 69, 69, 3, 73, 39, 26, 39, 94, 0, ],
      [7, 46, 47, 47, 88, 6, 73, 39, 26, 39, 94, 0,],
      [41, 55, 73, 23, 3, 79, 73, 39, 26, 39, 200, 0,],
      [56, 69, 21, 86, 3, 33, 73, 39, 26, 39, 94, 0,],
    ];
    yAxis: Object = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
    xAxis: Object = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'],
    };
  constructor(private voteService: VoteService) {
    // initialize tow-dimentionnal array
    for (let i:number = 0; i < 31; i++) {
      let line: number[]=[]

      for (let j:number = 0; j < 12; j++) {
        line.push(0);
      }
      this.dataSource.push(line);
    }

    let dataSourceUpdated: number[][]=[];
    for (let i:number = 0; i < 31; i++) {
      let line: number[]=[]

      for (let j:number = 0; j < 12; j++) {
        line.push(0);
      }
      dataSourceUpdated.push(line);
    }
    this.voteService.getAllVotes().subscribe({
      next: (data) => {
        // data.data.filter((ele: any) => {
        //   console.log('month vote', ele.vote_date.substring(5, 7));
        //   console.log('month vote', ele.vote_date.substring(8));
        //   // get month and day
        //   let monthVote = ele.vote_date.substring(5, 7);
        //   let dayVote = ele.vote_date.substring(8);

        //   return ele.vote_date.substring(5, 7) == '03';
        // });
        data.data.forEach((vote:any) => {
          // get month and day
          let monthVote = parseInt(vote.vote_date.substring(5, 7));
          let dayVote = parseInt(vote.vote_date.substring(8));
          console.log("VOTE_COUNT", vote);
          dataSourceUpdated[dayVote-1][monthVote-1] = vote.vote_count;
          console.log(dataSourceUpdated);

        });
        this.dataSource=dataSourceUpdated;


        console.log();
      },
    });
  }

  ngOnInit(): void {

  }

}
