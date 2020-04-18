import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { faRecordVinyl, faMusic } from '@fortawesome/free-solid-svg-icons';

export interface Media {
  backgroundImage: string;
  embed: any;
  artist: string;
  description: string;
  releases: string[];
  social: any;
}

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @HostListener('window:resize', ['$event'])

  discogs = faRecordVinyl;
  itunes = faMusic;

  public innerWidth: any;
  displayBandcamp: boolean = true;
  event: Observable<any>;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 500) {
      this.displayBandcamp = false;
    }
  }

  onResize(_event) {
    this.innerWidth = window.innerWidth;
  }

  music: Media[] = [
    {
      backgroundImage: "assets/ben-media.jpg",
      embed: {
        album: "https://bandcamp.com/EmbeddedPlayer/album=1720225765/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/",
        link: "http://beneisenberger.bandcamp.com/album/three-islands",
        title: "Three Islands by Ben Eisenberger"
      },
      artist: "Ben Eisenberger",
      description: "Pretty and pensive acoustic songs written by myself. In my dreams I would liken my style to a kind of Nick Drake-Joni Mitchell-Joanna Newsom hybrid. The album 'Three Islands' was inspired by, and in fact my solo music writing in general was started by, a trip I took in 2016 to Southeast Asia. A forthcoming record is currently being recorded and will include more instuments, but of course with the same somber timbre as my debut.",
      releases: [
        "Three Islands  (2018)"
      ],
      social: {
        spotify: "https://open.spotify.com/artist/3KtcHSwAEQ3zYYDnxYaF7m",
        apple: "https://music.apple.com/us/artist/ben-eisenberger/1372615790",
        bandcamp: "https://beneisenberger.bandcamp.com",
        discogs: "https://www.discogs.com/artist/6834215-Ben-Eisenberger"
      }
    },
    {
      backgroundImage: "assets/hussies-media.jpg",
      embed: {
        album: "https://bandcamp.com/EmbeddedPlayer/album=3402947417/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/",
        link: "http://hussiesband.bandcamp.com/album/fast",
        title: "Fast by Hussies"
      },
      artist: "Hussies",
      description: "Hussies has been around since 2012, and plays regularly in Omaha with locals and honestly whoever happens to be stopping through. Fronted by best bud and fellow acoustic crooner Tom Bartolomei, Hussies carries more rock aesthetic... what critics are calling the 'new Omaha sound' (we wish).",
      releases: [
        "Going  (2015)",
        "Nowhere  (2017)",
        "Fast  (2019)",
      ],
      social: {
        spotify: "https://open.spotify.com/artist/4IfUBGfCXHe2Qrp1rekmkT",
        apple: "https://music.apple.com/us/artist/hussies/1390214359",
        bandcamp: "https://hussiesband.bandcamp.com",
        discogs: "https://www.discogs.com/artist/6834241-Hussies"
      }
    },
    {
      backgroundImage: "assets/screaming-plastic-media.jpg",
      embed: {
        album: "https://bandcamp.com/EmbeddedPlayer/album=374132353/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/",
        link: "http://screamingplastic.bandcamp.com/album/screaming-plastic-2",
        title: "Screaming Plastic by Screaming Plastic"
      },
      artist: "Screaming Plastic",
      description: "Screaming Plastic is a collective of myself, Phill Smith (electronics), Hanah Mayer (cello) and Jeff Kolega (drums). We are a quartet that records live free improvisations, usually just recorded by myself on my cell phone. In 2017 we received a grant from New Music USA to record a proper debut album, which was released in early 2019.",
      releases: [
        "Live Improvisations (2017)",
        "Live Improvisations 2 (2017)",
        "Screaming Plastic (2019)"
      ],
      social: {
        spotify: "https://open.spotify.com/artist/24RFohtg9JgZ2LQ8ACwNTD",
        apple: "https://music.apple.com/us/artist/screaming-plastic/1390237575",
        bandcamp: "https://screamingplastic.bandcamp.com",
        discogs: "https://www.discogs.com/artist/6834231-Screaming-Plastic"
      }
    },
    {
      backgroundImage: "assets/fifi-media.jpg",
      embed: {
        album: "https://bandcamp.com/EmbeddedPlayer/album=2552986554/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/",
        link: "http://fifinono.bandcamp.com/album/fifi-nono",
        title: "FiFi NoNo by FiFi NoNo"
      },
      artist: "Fifi NoNo",
      description: "The brainchild of Mike Zimmerman (Flesh-Eating Skin Disease, DROSS) and fronted by Blake Kostszewa (Shrinks) - this is definitely the 'rowdy boys' group. We play(?)ed a mixture of goth punk/noise punk/hardcore and basically just like to have a good time. I think this band might be getting back together? I'm not sure. Look for that.",
      releases: [
        "Songs for the Anxious (2017)",
        "FiFi NoNo (2018)"
      ],
      social: {
        spotify: "https://open.spotify.com/artist/28fOj2ENtFz3V9tCE6kDil",
        apple: "https://music.apple.com/us/artist/fifi-nono/1392864945",
        bandcamp: "https://fifinono.bandcamp.com",
        discogs: "https://www.discogs.com/artist/6834294-FiFi-NoNo"
      }
    }
  ]

}
