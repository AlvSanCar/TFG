using System;
using System.Net.Http;
using System.Net.Sockets;


namespace ServidorTFG
{
    class Program
    {
        static void Main(string[] args)
        {

            Httpserver servidor = new Httpserver(8080);
            servidor.start();
        }
    }
}
