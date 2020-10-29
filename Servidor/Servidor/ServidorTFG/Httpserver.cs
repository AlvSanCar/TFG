using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Sockets;
using System.Net;
using System.Threading;
using System.IO;
using System.Diagnostics;

namespace ServidorTFG
{
    class Httpserver
    {
        private bool running = false;
        public const String Version = "HTTP/1.1";
        public const String Nombre = "Alvaro TFG";
        private TcpListener listener;
        private int puerto;
        public Httpserver(int port)
        {
            this.puerto = port;
            listener = new TcpListener(IPAddress.Any, port);

        }

        public  void start()
        {
            Thread hiloServidor = new Thread(new ThreadStart(Run));
            hiloServidor.Start();
        }

        public void Run()
        {
            running = true;
            listener.Start();

            while (running)
            {
                Console.WriteLine("Servidor TFG Sistema de Control Aparcamiento Arrancado");
                Console.WriteLine("Servicio arrancado en puerto: " + this.puerto);
                Console.WriteLine("Servicio arrancado en version" + Version);
                Console.WriteLine("Esperando conexiones...");
                TcpClient cliente = listener.AcceptTcpClient();
                Console.WriteLine("Peticion aceptada");
                Console.WriteLine("Cliente:" + cliente);
                procesarCliente(cliente);
                cliente.Close();
            }

            running = false;
            listener.Stop();
        }

        public void procesarCliente(TcpClient cliente)
        {
            StreamReader reader = new StreamReader(cliente.GetStream());

            String msg = "";
            while (reader.Peek() != -1)
            {
                msg += reader.ReadLine() + "\n";
            }

            Console.WriteLine("Peticion: \n" + msg);

            Peticion pet = Peticion.getPeticion(msg);
            Respuesta resp = Respuesta.Form(pet);
            resp.Post(cliente.GetStream());
            
        }
    }
}
