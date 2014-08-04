#pragma once

using namespace System;
using namespace System::ComponentModel;
using namespace System::Collections;
using namespace System::Windows::Forms;
using namespace System::Data;
using namespace System::Drawing;


namespace TMBViatges {

	/// <summary>
	/// Resumen de NonWorking
	///
	/// ADVERTENCIA: si cambia el nombre de esta clase, deberá cambiar la
	///          propiedad 'Nombre de archivos de recursos' de la herramienta de compilación de recursos administrados
	///          asociada con todos los archivos .resx de los que depende esta clase. De lo contrario,
	///          los diseñadores no podrán interactuar correctamente con los
	///          recursos adaptados asociados con este formulario.
	/// </summary>
	public ref class NonWorking : public System::Windows::Forms::Form
	{
	public:
		NonWorking()
		{
			InitializeComponent();
			initList();
		}
		void saveMarkedDays();
		void initList();

	protected:
		/// <summary>
		/// Limpiar los recursos que se estén utilizando.
		/// </summary>
		~NonWorking()
		{
			if (components)
			{
				delete components;
			}
		}
	private: System::Windows::Forms::Button^  button1;
	private: System::Windows::Forms::Form^ parent_form;
	private: System::Windows::Forms::CheckBox^  checkBox1;
	private: System::Windows::Forms::Button^  button2;
	private: System::Windows::Forms::Button^  button3;
	private: System::Windows::Forms::CheckBox^  checkBox2;
	private: System::Windows::Forms::Button^  button4;
	private: System::Windows::Forms::ListView^  listView1;
	private: System::Windows::Forms::ColumnHeader^  c_nonwork;
	private: System::Windows::Forms::ColumnHeader^  c_day;
	private: System::Windows::Forms::ColumnHeader^  c_mes;
	private: System::Windows::Forms::Button^  b_ok;
	public: static System::Windows::Forms::ListView::CheckedIndexCollection^ nw_days;

	protected: 

	private:
		/// <summary>
		/// Variable del diseñador requerida.
		/// </summary>
		System::ComponentModel::Container ^components;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Método necesario para admitir el Diseñador. No se puede modificar
		/// el contenido del método con el editor de código.
		/// </summary>
		void InitializeComponent(void)
		{
			this->button1 = (gcnew System::Windows::Forms::Button());
			this->checkBox1 = (gcnew System::Windows::Forms::CheckBox());
			this->button2 = (gcnew System::Windows::Forms::Button());
			this->button3 = (gcnew System::Windows::Forms::Button());
			this->checkBox2 = (gcnew System::Windows::Forms::CheckBox());
			this->button4 = (gcnew System::Windows::Forms::Button());
			this->listView1 = (gcnew System::Windows::Forms::ListView());
			this->c_nonwork = (gcnew System::Windows::Forms::ColumnHeader());
			this->c_day = (gcnew System::Windows::Forms::ColumnHeader());
			this->c_mes = (gcnew System::Windows::Forms::ColumnHeader());
			this->b_ok = (gcnew System::Windows::Forms::Button());
			this->SuspendLayout();
			// 
			// button1
			// 
			this->button1->Location = System::Drawing::Point(285, 12);
			this->button1->Name = L"button1";
			this->button1->Size = System::Drawing::Size(24, 23);
			this->button1->TabIndex = 0;
			this->button1->Text = L"[";
			this->button1->UseVisualStyleBackColor = true;
			// 
			// checkBox1
			// 
			this->checkBox1->AutoSize = true;
			this->checkBox1->Checked = true;
			this->checkBox1->CheckState = System::Windows::Forms::CheckState::Checked;
			this->checkBox1->Enabled = false;
			this->checkBox1->Location = System::Drawing::Point(315, 17);
			this->checkBox1->Name = L"checkBox1";
			this->checkBox1->Size = System::Drawing::Size(15, 14);
			this->checkBox1->TabIndex = 2;
			this->checkBox1->UseVisualStyleBackColor = true;
			// 
			// button2
			// 
			this->button2->Location = System::Drawing::Point(336, 12);
			this->button2->Name = L"button2";
			this->button2->Size = System::Drawing::Size(24, 23);
			this->button2->TabIndex = 3;
			this->button2->Text = L"]";
			this->button2->UseVisualStyleBackColor = true;
			// 
			// button3
			// 
			this->button3->Location = System::Drawing::Point(336, 41);
			this->button3->Name = L"button3";
			this->button3->Size = System::Drawing::Size(24, 23);
			this->button3->TabIndex = 6;
			this->button3->Text = L"]";
			this->button3->UseVisualStyleBackColor = true;
			// 
			// checkBox2
			// 
			this->checkBox2->AutoSize = true;
			this->checkBox2->Enabled = false;
			this->checkBox2->Location = System::Drawing::Point(315, 46);
			this->checkBox2->Name = L"checkBox2";
			this->checkBox2->Size = System::Drawing::Size(15, 14);
			this->checkBox2->TabIndex = 5;
			this->checkBox2->UseVisualStyleBackColor = true;
			// 
			// button4
			// 
			this->button4->Location = System::Drawing::Point(285, 41);
			this->button4->Name = L"button4";
			this->button4->Size = System::Drawing::Size(24, 23);
			this->button4->TabIndex = 4;
			this->button4->Text = L"[";
			this->button4->UseVisualStyleBackColor = true;
			// 
			// listView1
			// 
			this->listView1->CheckBoxes = true;
			this->listView1->Columns->AddRange(gcnew cli::array< System::Windows::Forms::ColumnHeader^  >(3) {this->c_nonwork, this->c_day, 
				this->c_mes});
			this->listView1->FullRowSelect = true;
			this->listView1->Location = System::Drawing::Point(12, 17);
			this->listView1->Name = L"listView1";
			this->listView1->Size = System::Drawing::Size(216, 278);
			this->listView1->TabIndex = 7;
			this->listView1->UseCompatibleStateImageBehavior = false;
			this->listView1->View = System::Windows::Forms::View::Details;
			// 
			// c_nonwork
			// 
			this->c_nonwork->Text = L"Festa";
			this->c_nonwork->Width = 40;
			// 
			// c_day
			// 
			this->c_day->Text = L"Dia";
			this->c_day->TextAlign = System::Windows::Forms::HorizontalAlignment::Right;
			this->c_day->Width = 90;
			// 
			// c_mes
			// 
			this->c_mes->Text = L"Mes";
			this->c_mes->Width = 80;
			// 
			// b_ok
			// 
			this->b_ok->Location = System::Drawing::Point(284, 252);
			this->b_ok->Name = L"b_ok";
			this->b_ok->Size = System::Drawing::Size(75, 23);
			this->b_ok->TabIndex = 8;
			this->b_ok->Text = L"Acceptar";
			this->b_ok->UseVisualStyleBackColor = true;
			this->b_ok->Click += gcnew System::EventHandler(this, &NonWorking::b_ok_Click);
			// 
			// NonWorking
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(6, 13);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(371, 307);
			this->Controls->Add(this->b_ok);
			this->Controls->Add(this->listView1);
			this->Controls->Add(this->button3);
			this->Controls->Add(this->checkBox2);
			this->Controls->Add(this->button4);
			this->Controls->Add(this->button2);
			this->Controls->Add(this->checkBox1);
			this->Controls->Add(this->button1);
			this->FormBorderStyle = System::Windows::Forms::FormBorderStyle::FixedDialog;
			this->MaximizeBox = false;
			this->Name = L"NonWorking";
			this->ShowIcon = false;
			this->StartPosition = System::Windows::Forms::FormStartPosition::CenterScreen;
			this->Text = L"NonWorking";
			this->ResumeLayout(false);
			this->PerformLayout();

		}
#pragma endregion
	private: System::Void b_ok_Click(System::Object^  sender, System::EventArgs^  e)
			 {
				saveMarkedDays();
				this->Close();
			 }
};
}
