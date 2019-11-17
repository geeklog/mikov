import * as dgram from 'dgram';
import { sleep } from './time';
import { clone } from './array';
import md5 from './md5';
import * as os from 'os';

interface PeerInfo {
  id: string;
  name: string;
  pid: number;
  mac: string;
  ip: string;
  port: number;
}

export class Peer {

  others: {[id: string]: PeerInfo} = {};
  listenPort: number = 0;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  myInfo(): PeerInfo {
    const en0 = os.networkInterfaces().en0.find(i => i.family === 'IPv4');
    const mac = en0 ? en0.mac : "";
    const ip = en0 ? en0.address : "";
    const port = this.listenPort || 0;
    const pid = process.pid;
    const name = this.name;
    return {
      id: md5([pid, mac, ip, pid, port].join(',')),
      name,
      pid,
      mac,
      ip,
      port,
    };
  }

  handshakeMsg() {
    return Buffer.from(JSON.stringify(this.myInfo()));
  }

  async hi(ports: number[] = [33333, 33334]) {
    this.serv(ports);

    await sleep(500);

    const hiClient = dgram.createSocket('udp4');
    hiClient.bind(async () => {
      hiClient.setBroadcast(true);
      for (let i = 0; i < 10; i++) {
        for (const port of ports) {
          await this.send(hiClient, '255.255.255.255', port, this.handshakeMsg());
        }
        await sleep(1000);
      }
      hiClient.close();
    });
  }

  async send(agent: dgram.Socket, host: string, port: number, msg: Buffer) {
    return await new Promise((resolve, reject) => {
      agent.send(msg, port, host, (err) => {
        if (err) {
          reject(err);
        } else {
          // console.log(`[sent][${port}] ${msg}`);
          resolve();
        }
      });
    });
  }

  async serv(ports: number[]) {
    ports = clone(ports);
    const port = ports.shift();
    if (!port) {
      throw new Error('Aborted: ran out of ports');
    }
    const hiServer = dgram.createSocket('udp4');
    hiServer.on('message', (msg, rinfo) => {
      // console.log(`[recv][${rinfo.address}:${rinfo.port}] ${msg}`);
      const peerInfo = JSON.parse(msg.toString());
      if (peerInfo.id === this.myInfo().id) {
        return;
      }
      if (!this.others[peerInfo.id]) {
        console.log('[Found a new peer]', peerInfo);
      }
      this.others[peerInfo.id] = peerInfo;
    });
    hiServer.on('error', err => {
      if (err.message === `bind EADDRINUSE 0.0.0.0:${port}`) {
        console.log(`port:${port} in use, serve on: ${ports[0]}`);
        this.serv(ports);
      } else {
        throw err;
      }
    });
    hiServer.bind(port);
    this.listenPort = port;
  }

}
