import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';
import { Character } from '../models/character';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-votes-heatmap',
  templateUrl: './votes-heatmap.component.html',
  styleUrls: ['./votes-heatmap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotesHeatmapComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacerId = 0;

  // Data for heatmap
  dataSource: any[][] = [
    [73, 39, 26, 39, 94, 0, 73, 39, 26, 39, 94, 0,],
    [93, 58, 53, 38, 26, 68, 73, 39, 26, 39, 94, 0,],
    [99, 28, 22, 4, 66, 90, 73, 39, 26, 39, 94, 0,],
    [14, 26, 97, 69, 69, 3, 73, 39, 26, 39, 94, 0,],
    [7, 46, 47, 47, 88, 6, 73, 39, 26, 39, 94, 0,],
    [41, 55, 73, 23, 3, 79, 73, 39, 26, 39, 94, 0,],
    [56, 69, 21, 86, 3, 33, 73, 39, 26, 39, 94, 0,],
    [45, 7, 53, 81, 95, 79, 73, 39, 26, 39, 94, 0,],
    [60, 77, 74, 68, 88, 51, 73, 39, 26, 39, 94, 0,],
    [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
    [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
    [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
    [73, 39, 26, 39, 94, 0, 73, 39, 26, 39, 94, 0,],
    [93, 58, 53, 38, 26, 68, 73, 39, 26, 39, 94, 0,],
    [99, 28, 22, 4, 66, 90, 73, 39, 26, 39, 94, 0,],
    [14, 26, 97, 69, 69, 3, 73, 39, 26, 39, 94, 0,],
    [7, 46, 47, 47, 88, 6, 73, 39, 26, 39, 94, 0,],
    [41, 55, 73, 23, 3, 79, 73, 39, 26, 39, 94, 0,],
    [56, 69, 21, 86, 3, 33, 73, 39, 26, 39, 94, 0,],
    [45, 7, 53, 81, 95, 79, 73, 39, 26, 39, 94, 0,],
    [60, 77, 74, 68, 88, 51, 73, 39, 26, 39, 94, 0,],
    [50, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
    [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
    [25, 25, 10, 12, 78, 14, 73, 39, 26, 39, 94, 0,],
    [73, 39, 26, 39, 94, 0, 73, 39, 26, 39, 94, 0,],
    [93, 58, 53, 38, 26, 68, 73, 39, 26, 39, 94, 0,],
    [99, 28, 22, 4, 66, 90, 73, 39, 26, 39, 94, 0,],
    [14, 26, 97, 69, 69, 3, 73, 39, 26, 39, 94, 0,],
    [7, 46, 47, 47, 88, 6, 73, 39, 26, 39, 94, 0,],
    [41, 55, 73, 23, 3, 79, 73, 39, 26, 39, 200, 0,],
    [56, 69, 21, 86, 3, 33, 73, 39, 26, 39, 94, 0,],
  ];
  yAxis: Object = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  xAxis: Object = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
  };
  public paletteSettings: Object = {
    palette: [{ color: 'rgb(172, 213, 242)' },
    { color: 'rgb(127, 168, 201)' },
    { color: 'rgb(82, 123, 160)' },
    { color: 'rgb(37, 78, 119)' },
    ],
    type: 'Gradient'
  };
  constructor(private voteService: VoteService) {
    this.getData();
  }

  ngOnInit(): void {

    // fill in select input
    this.voteService.getCharacters().subscribe({
      next: (data) => {
        console.log("Characters - votes-heatmap ", data);
        this.characters = data.data;
      }
    })
  }

  onChange(event: any) {
    this.selectedCharacerId = event.target.value;
    this.getData();
  }

  getData() {
    // initialize tow-dimentionnal array
    for (let i: number = 0; i < 31; i++) {
      let line: any[] = []

      for (let j: number = 0; j < 12; j++) {
        line.push(null);
      }
      this.dataSource.push(line);
    }
    let dataSourceUpdated: any[][] = [];
    for (let i: number = 0; i < 31; i++) {
      let line: any[] = []

      for (let j: number = 0; j < 12; j++) {
        line.push(null);
      }
      dataSourceUpdated.push(line);
    }


    // get votes by character
    if (this.selectedCharacerId) {
      // get all votes
      this.voteService.getCharacterVotes(this.selectedCharacerId).subscribe({
        next: (data) => {
          data.data.forEach((vote: any) => {
            // get month and day
            let monthVote = parseInt(vote.vote_date.substring(5, 7));
            let dayVote = parseInt(vote.vote_date.substring(8));
            dataSourceUpdated[dayVote - 1][monthVote - 1] = vote.vote_count;
            console.log(dataSourceUpdated);

          });
          this.dataSource = dataSourceUpdated;


          console.log();
        },
      });

    } else {
      // get all votes
      this.voteService.getAllVotes().subscribe({
        next: (data) => {
          data.data.forEach((vote: any) => {
            // get month and day
            let monthVote = parseInt(vote.vote_date.substring(5, 7));
            let dayVote = parseInt(vote.vote_date.substring(8));
            dataSourceUpdated[dayVote - 1][monthVote - 1] = vote.vote_count;
            console.log(dataSourceUpdated);

          });
          this.dataSource = dataSourceUpdated;


          console.log();
        },
      });
    }

  }

}
