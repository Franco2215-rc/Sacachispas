
namespace QuintanaGOAT
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.lblVersion = new System.Windows.Forms.Label();
            this.txtVersion = new System.Windows.Forms.TextBox();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.btnConsultar = new System.Windows.Forms.Button();
            this.txtUsuario = new System.Windows.Forms.TextBox();
            this.lblUsuario = new System.Windows.Forms.Label();
            this.Directorio = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.btnBuscar = new System.Windows.Forms.Button();
            this.folderBrowserDialog1 = new System.Windows.Forms.FolderBrowserDialog();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.SuspendLayout();
            // 
            // lblVersion
            // 
            this.lblVersion.AutoSize = true;
            this.lblVersion.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.lblVersion.Font = new System.Drawing.Font("Cooper Black", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblVersion.Location = new System.Drawing.Point(27, 25);
            this.lblVersion.Name = "lblVersion";
            this.lblVersion.Size = new System.Drawing.Size(56, 16);
            this.lblVersion.TabIndex = 0;
            this.lblVersion.Text = "Version";
            this.lblVersion.Click += new System.EventHandler(this.label1_Click);
            // 
            // txtVersion
            // 
            this.txtVersion.Location = new System.Drawing.Point(89, 21);
            this.txtVersion.Name = "txtVersion";
            this.txtVersion.Size = new System.Drawing.Size(261, 23);
            this.txtVersion.TabIndex = 1;
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // btnConsultar
            // 
            this.btnConsultar.BackColor = System.Drawing.SystemColors.Control;
            this.btnConsultar.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnConsultar.Location = new System.Drawing.Point(264, 107);
            this.btnConsultar.Name = "btnConsultar";
            this.btnConsultar.Size = new System.Drawing.Size(75, 23);
            this.btnConsultar.TabIndex = 3;
            this.btnConsultar.Text = "Consultar";
            this.btnConsultar.UseVisualStyleBackColor = false;
            this.btnConsultar.Click += new System.EventHandler(this.btnConsultar_Click);
            // 
            // txtUsuario
            // 
            this.txtUsuario.Location = new System.Drawing.Point(89, 64);
            this.txtUsuario.Name = "txtUsuario";
            this.txtUsuario.Size = new System.Drawing.Size(261, 23);
            this.txtUsuario.TabIndex = 4;
            this.txtUsuario.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // lblUsuario
            // 
            this.lblUsuario.AutoSize = true;
            this.lblUsuario.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.lblUsuario.Font = new System.Drawing.Font("Cooper Black", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblUsuario.Location = new System.Drawing.Point(27, 67);
            this.lblUsuario.Name = "lblUsuario";
            this.lblUsuario.Size = new System.Drawing.Size(57, 16);
            this.lblUsuario.TabIndex = 5;
            this.lblUsuario.Text = "Usuario";
            // 
            // Directorio
            // 
            this.Directorio.AutoSize = true;
            this.Directorio.Location = new System.Drawing.Point(405, 21);
            this.Directorio.Name = "Directorio";
            this.Directorio.Size = new System.Drawing.Size(59, 15);
            this.Directorio.TabIndex = 6;
            this.Directorio.Tag = "lblDirectorio";
            this.Directorio.Text = "Directorio";
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(473, 20);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(201, 23);
            this.textBox1.TabIndex = 7;
            // 
            // btnBuscar
            // 
            this.btnBuscar.Location = new System.Drawing.Point(689, 21);
            this.btnBuscar.Name = "btnBuscar";
            this.btnBuscar.Size = new System.Drawing.Size(75, 23);
            this.btnBuscar.TabIndex = 8;
            this.btnBuscar.Text = "Buscar";
            this.btnBuscar.UseVisualStyleBackColor = true;
            this.btnBuscar.Click += new System.EventHandler(this.btnConsultar2_Click);
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.btnBuscar);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.Directorio);
            this.Controls.Add(this.lblUsuario);
            this.Controls.Add(this.txtUsuario);
            this.Controls.Add(this.btnConsultar);
            this.Controls.Add(this.txtVersion);
            this.Controls.Add(this.lblVersion);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lblVersion;
        private System.Windows.Forms.TextBox txtVersion;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.Button btnConsultar;
        private System.Windows.Forms.TextBox txtUsuario;
        private System.Windows.Forms.Label lblUsuario;
        private System.Windows.Forms.Label Directorio;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Button btnBuscar;
        private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog1;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
    }
}

