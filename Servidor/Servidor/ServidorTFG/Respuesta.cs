using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Sockets;
using System.Text;

namespace ServidorTFG
{
    class Respuesta
    {

        private Byte[] data = null;
        private String estado;
        private String mime;
        private Respuesta(String estado,Byte[] data, String mime) {
            this.data = data;
            this.estado = estado;
            this.mime = mime;
        }

        
        public static Respuesta Form (Peticion peticion) {
            
            if (peticion == null)
            {
                return respuestaNula();
            }
            return respuestaNula();
        }

        public static Respuesta respuestaNula()
        {
            return new Respuesta("404 Bad Request",new byte[0],"html/text" );
        }
        public void Post(NetworkStream stream)
        {
            StreamWriter writer = new StreamWriter(stream);
            writer.WriteLine(String.Format("{0} {1}\r\nServer: {2},\r\nContent-Type: {3}\r\nAccept-Ranges: bytes\r\nContent-Length: {4}\r\n",Httpserver.Version,estado,Httpserver.Nombre,mime,data.Length));

            stream.Write(data, 0, data.Length);

        }
    }
}
