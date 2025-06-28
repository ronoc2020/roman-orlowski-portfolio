document.addEventListener('DOMContentLoaded', function() {
  const terminalOutput = document.getElementById('terminal-output');
  const terminalCommand = document.getElementById('terminal-command');
  const commandResult = document.getElementById('command-result');
  
  // Available commands
  const commands = {
    help: {
      desc: "Show available commands",
      execute: () => {
        let helpText = "Available commands:\n\n";
        Object.keys(commands).forEach(cmd => {
          helpText += `${cmd} - ${commands[cmd].desc}\n`;
        });
        return helpText;
      }
    },
    whoami: {
      desc: "Show current user",
      execute: () => "root@kali"
    },
    nmap: {
      desc: "Network scanner",
      execute: () => "Starting Nmap 7.93 ( https://nmap.org )\n" +
                    "Nmap scan report for localhost (127.0.0.1)\n" +
                    "Host is up (0.000045s latency).\n" +
                    "Not shown: 995 closed tcp ports (reset)\n" +
                    "PORT     STATE SERVICE\n" +
                    "22/tcp   open  ssh\n" +
                    "80/tcp   open  http\n" +
                    "443/tcp  open  https\n" +
                    "3306/tcp open  mysql\n" +
                    "8080/tcp open  http-proxy\n\n" +
                    "Nmap done: 1 IP address (1 host up) scanned in 0.06 seconds"
    },
    msfconsole: {
      desc: "Metasploit framework console",
      execute: () => "       =[ metasploit v6.3.2-dev                          ]\n" +
                     "+ -- --=[ 2291 exploits - 1205 auxiliary - 404 post       ]\n" +
                     "+ -- --=[ 968 payloads - 45 encoders - 11 nops            ]\n" +
                     "+ -- --=[ 9 evasion                                       ]\n\n" +
                     "Metasploit tip: View all productivity tips with the tips command\n\n" +
                     "msf6 > "
    },
    searchsploit: {
      desc: "Search for exploits",
      execute: () => "----------------------------------------------------------------------------------------\n" +
                     " Exploit Title                           | Path\n" +
                     "----------------------------------------------------------------------------------------\n" +
                     "Apache 2.4.49 - Path Traversal          | linux/remote/50808.py\n" +
                     "WordPress 5.8.2 - SQL Injection         | php/webapps/50756.txt\n" +
                     "Linux Kernel 5.8 - Local Privilege Esc  | linux/local/50740.c\n" +
                     "----------------------------------------------------------------------------------------\n" +
                     "Shellcodes: No Results"
    },
    ifconfig: {
      desc: "Network interface configuration",
      execute: () => "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n" +
                     "        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255\n" +
                     "        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>\n" +
                     "        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)\n" +
                     "        RX packets 123456  bytes 987654321 (987.6 MB)\n" +
                     "        RX errors 0  dropped 0  overruns 0  frame 0\n" +
                     "        TX packets 654321  bytes 123456789 (123.4 MB)\n" +
                     "        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"
    },
    ping: {
      desc: "Test network connectivity",
      execute: () => "PING google.com (142.250.190.46) 56(84) bytes of data.\n" +
                     "64 bytes from waw02s21-in-f14.1e100.net (142.250.190.46): icmp_seq=1 ttl=117 time=12.3 ms\n" +
                     "64 bytes from waw02s21-in-f14.1e100.net (142.250.190.46): icmp_seq=2 ttl=117 time=11.8 ms\n" +
                     "64 bytes from waw02s21-in-f14.1e100.net (142.250.190.46): icmp_seq=3 ttl=117 time=12.1 ms\n\n" +
                     "--- google.com ping statistics ---\n" +
                     "3 packets transmitted, 3 received, 0% packet loss, time 2003ms\n" +
                     "rtt min/avg/max/mdev = 11.876/12.098/12.342/0.193 ms"
    },
    netstat: {
      desc: "Network statistics",
      execute: () => "Active Internet connections (servers and established)\n" +
                     "Proto Recv-Q Send-Q Local Address           Foreign Address         State\n" +
                     "tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\n" +
                     "tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN\n" +
                     "tcp        0      0 192.168.1.100:22        192.168.1.1:49234       ESTABLISHED\n" +
                     "tcp6       0      0 :::80                   :::*                    LISTEN\n" +
                     "tcp6       0      0 :::22                   :::*                    LISTEN"
    },
    clear: {
      desc: "Clear terminal",
      execute: () => {
        commandResult.innerHTML = '';
        return "Terminal cleared";
      }
    },
    uname: {
      desc: "Show system information",
      execute: () => "Linux kali 5.18.0-kali5-amd64 #1 SMP Debian 5.18.16-1kali1 (2022-08-31) x86_64 GNU/Linux"
    }
  };
  
  // Handle command execution
  terminalCommand.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const command = terminalCommand.value.trim();
      terminalCommand.value = '';
      
      if (!command) return;
      
      // Add command to output
      const commandLine = document.createElement('div');
      commandLine.className = 'terminal-line';
      commandLine.textContent = `$ ${command}`;
      terminalOutput.appendChild(commandLine);
      
      // Execute command
      let result;
      if (commands[command]) {
        result = commands[command].execute();
      } else {
        result = `Command not found: ${command}\nType 'help' for available commands`;
      }
      
      // Display result
      const resultElement = document.createElement('div');
      resultElement.className = 'terminal-line';
      resultElement.textContent = result;
      terminalOutput.appendChild(resultElement);
      
      // Scroll to bottom
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
});
