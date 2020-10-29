using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using Google.Protobuf;
using MySql.Data.MySqlClient;

namespace ServidorTFG
{
    class Peticion
    {
        public String type { get; set; }
        public String URL { get; set; }
        public String HOST { get; set; }

        public Peticion(String type, String url, String host) {
            this.type = type;
            this.URL = url;
            this.HOST = host;
        }

        public  static Peticion getPeticion(String peticion)
        {   
            if (String.IsNullOrEmpty(peticion))
            {
                return null;
            }

            String[] tokens = peticion.Split(' ');
            string type = tokens[0];
            string url = tokens[1];
            string host = tokens[4];
           /* Console.WriteLine("La url");
            Console.WriteLine(url);
            Console.WriteLine("La Host");
            Console.WriteLine(host);
            Console.WriteLine("La Tipo");
            Console.WriteLine(type);*/
            Boolean resultado = false;
            resultado = processPeticion(url);
            return new Peticion(type, url, host);

        }

        public static Boolean processPeticion(string url)
        {
            String[] variables = url.Split('&');
            string plaza;
            int eslibre = 0;
            String frame;
            String matricula = "";
            int resultadoBBDD = 0;

            plaza = variables[0].Substring(7,variables[0].Length - 7);
            eslibre = Int32.Parse(variables[1].Substring(8, 1));
            frame = variables[2].Substring(6, variables[2].Length - 6);

            if (eslibre == 0)
            {
                matricula = procesarFrame(frame, plaza);
                resultadoBBDD = MandarDatos(plaza, matricula, eslibre);
            }

            else
            {
                resultadoBBDD = MandarDatos(plaza,matricula,eslibre);
            }


            Boolean resultado = false;


            return resultado;
        }

        private static MySqlConnection conectar()
        {
            MySqlConnection conexion = new MySqlConnection();
            try
            {
                //Se forma la cadena de conexion con los datos de nuestro servidor
                //Server: 127.0.0.1 o localhost
                //Database: Nombre de la base de datos
                //user id: usario
                //Pwd: Contraseña del servidor
                conexion.ConnectionString = "Server=127.0.0.1;Port=3306; Database=tfg_asc; User id=root; Pwd=;";
                conexion.Open();//Se abre una conexion a la base de datos
                Console.WriteLine("Conexión realizada con exito: Estado " + conexion.State);

                //conexion.Close();//Se cierra conexion
            }
            catch (MySqlException ex)
            {   //Si ocurio un error -> Muestra el tipo de error
                Console.WriteLine("Error:" + ex.Message);
            }
            return conexion;
        }

        public static int MandarDatos(string plaza, string matricula, int esLibre)
        {
            int retorno = 0;
            int id_ent = 0;
            MySqlConnection conexion = conectar();
            MySqlCommand select = new MySqlCommand(string.Format("Select count(matricula) as b from parking where plaza = {0}", plaza), conexion);
            MySqlDataReader reader = select.ExecuteReader();
            string fecha = DateTime.Today.ToString("d");
            string hora = DateTime.Now.ToString("hh:mm:ss");
            while (reader.Read())
            {
                id_ent = reader.GetInt32("b");
                //Console.WriteLine("He leido {0}", id_ent);
            }

            conexion.Close();
            if (id_ent == 0)
            {
                conexion = conectar();
                MySqlCommand comando = new MySqlCommand(string.Format("Insert into parking (plaza,matricula,eslibre,fecha,hora) values ('{0}','{1}','{2}','{3}','{4}')", plaza, matricula, esLibre,fecha,hora), conexion);
                retorno = comando.ExecuteNonQuery();
                // Console.WriteLine("Creamos Registro");
                conexion.Close();
                return 1;
            }
            else
            {
                conexion = conectar();
                MySqlCommand comando = new MySqlCommand(string.Format("Update parking set plaza='{0}', matricula='{1}',eslibre='{2}',fecha='{3}',hora=,'{4}' where plaza ={0}", plaza, matricula,esLibre,fecha,hora), conexion);
                retorno = comando.ExecuteNonQuery();
                // Console.WriteLine("Modificamos Registro");
                conexion.Close();
                return 2;
            }

        }

        private static string crearFichero(byte[] buffer,string plaza)
        {
            byte[] image_data = new byte[409600];
            string path;

            path = "D:\\PFG\\AppPFG\\frames\\" + plaza + "_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".jpg";

            FileStream fs = File.Create(path);

            image_data = buffer;
            fs.Write(image_data, 0, buffer.Length);

            return path;

        }

        public static string procesarFrame (string frame,string plaza)
        {
            string matricula = "";
            Encoding unicode = Encoding.Unicode;
            byte[] bytes = unicode.GetBytes(frame);
            string path = crearFichero(bytes, plaza);

            matricula = procesarImagen(path);

            return matricula;

        }

        public static string procesarImagen(string path)
        {
            string matricula = "";
            // 1) Create Process Info
            var psi = new ProcessStartInfo();
            psi.FileName = @"C:\\Users\\alvsa\\AppData\\Local\\Programs\\Python\\Python38-32\python.exe";

            // 2) Provide script and arguments

            var script = @"C:\Users\alvsa\Desktop\Python\Codigo\ANPR.py " + path;

            psi.Arguments = $"\"{script}\"";

            // 3) Process configuration
            psi.UseShellExecute = false;
            psi.CreateNoWindow = true;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;

            // 4) Execute process and get output
            var errors = "";
            var results = "";

            using (var process = Process.Start(psi))
            {
                errors = process.StandardError.ReadToEnd();
                results = process.StandardOutput.ReadToEnd();
            }

            // 5) Display output
           /* Console.WriteLine("ERRORS:");
            Console.WriteLine(errors);
            Console.WriteLine();
            Console.WriteLine("Results:");
            Console.WriteLine(results);*/
            matricula = results.Trim();
            matricula = matricula.Replace(" ", "");
            /*Console.WriteLine("La matricula es:");
            Console.WriteLine(matricula);*/

            return matricula;

        }

    }
}

