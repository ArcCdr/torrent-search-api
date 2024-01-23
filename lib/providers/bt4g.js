const TorrentProvider = require('../TorrentProvider');

class Bt4g extends TorrentProvider {
  constructor() {
    super({
      name: 'Bt4g',
      baseUrl: 'https://bt4gprx.com',
      enableCloudFareBypass: true,
      searchUrl: '/search?q={query}&category={cat}',
      categories: {
        All: ''
      },
      defaultCategory: 'All',
      resultsPerPageCount: 15,
      itemsSelector: 'div.row div.col.s12 div h5',
      itemSelectors: {
        title: 'a@title',
        seeds: 'b#seeders | int',
        peers: 'b#leechers | int',
        size: 'b.cpill.yellow-pill',
        desc: 'a@href'
      },
      paginateSelector: 'li.active.teal.lighten-1 + li.waves-effect a@href',
    });
  }

  formatMagnet(infoHash, name) {
        const trackers = [
          'udp://tracker.opentrackr.org:1337/announce',
          'udp://tracker.auctor.tv:6969/announce', 
          'udp://opentracker.i2p.rocks:6969/announce', 
          'udp://open.demonii.com:1337/announce', 
          'udp://open.tracker.cl:1337/announce', 
          'http://tracker.openbittorrent.com:80/announce', 
          'udp://tracker.openbittorrent.com:6969/announce', 
          'udp://open.stealth.si:80/announce', 
          'udp://tracker.torrent.eu.org:451/announce', 
          'udp://tracker.moeking.me:6969/announce', 
          'udp://explodie.org:6969/announce', 
          'udp://exodus.desync.com:6969/announce', 
          'udp://tracker.theoks.net:6969/announce', 
          'udp://tracker-udp.gbitt.info:80/announce', 
          'https://tracker.gbitt.info:443/announce', 
          'http://tracker.gbitt.info:80/announce', 
          'udp://uploads.gamecoast.net:6969/announce', 
          'udp://tracker.tiny-vps.com:6969/announce', 
          'udp://tracker.skyts.net:6969/announce', 
          'udp://opentracker.io:6969/announce', 
          'https://tracker.bt4g.com:443/announce'
    ];
    const trackersQueryString = `&tr=${trackers.map(encodeURIComponent).join('&tr=')}`;
    return `magnet:?xt=urn:btih:${infoHash}&dn=${encodeURIComponent(name)}${trackersQueryString}`;
  }

  getMagnet(torrent) {
    var torrentDetailUrl = this.xray(encodeURI(torrent.desc), 'li a.grey-text.text-darken-4@href');
    var pos = torrentDetailUrl.lastIndexOf('/');
    var infoHash = torrentDetailUrl.substring(pos + 1);
    return this.formatMagnet(infoHash, this.name)
  }

  getTorrentDetails(torrent) {
    throw new Error('Not implemented');
  }

}

module.exports = Bt4g;