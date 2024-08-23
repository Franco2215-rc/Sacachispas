using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace QuintanaGOAT
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void btnConsultar_Click(object sender, EventArgs e)
        {
            ConsultarInfo();
        }
        private void ConsultarInfo()
        {
            txtVersion.Text = Environment.OSVersion.ToString();
            txtUsuario.Text = Environment.UserName;
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void btnConsultar2_Click(object sender, EventArgs e)
        {
            if (folderBrowserDialog1.ShowDialog() == DialogResult.Cancel)
            {
                textBox1.Text = "";
                    
            }
            else
            {
                textBox1.Text = folderBrowserDialog1.SelectedPath; 
                    
            }
        }
        
    }
}
