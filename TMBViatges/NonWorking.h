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
		void readFile();
		void saveFile();

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
	private: System::Windows::Forms::Button^  b_nextSel;
	protected: 

	private: System::Windows::Forms::Form^ parent_form;
	private: System::Windows::Forms::CheckBox^  checkBox1;
	private: System::Windows::Forms::Button^  b_prevSel;
	private: System::Windows::Forms::Button^  b_prevUnsel;


	private: System::Windows::Forms::CheckBox^  checkBox2;
	private: System::Windows::Forms::Button^  b_nextUnsel;

	private: System::Windows::Forms::ListView^  listView1;
	private: System::Windows::Forms::ColumnHeader^  c_nonwork;
	private: System::Windows::Forms::ColumnHeader^  c_day;
	private: System::Windows::Forms::ColumnHeader^  c_mes;
	private: System::Windows::Forms::Button^  b_ok;
	public: static System::Windows::Forms::ListView::CheckedIndexCollection^ nw_days;
	private: System::Windows::Forms::Button^  b_read;
	public: 
	private: System::Windows::Forms::Button^  b_save;

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
			this->b_nextSel = (gcnew System::Windows::Forms::Button());
			this->checkBox1 = (gcnew System::Windows::Forms::CheckBox());
			this->b_prevSel = (gcnew System::Windows::Forms::Button());
			this->b_prevUnsel = (gcnew System::Windows::Forms::Button());
			this->checkBox2 = (gcnew System::Windows::Forms::CheckBox());
			this->b_nextUnsel = (gcnew System::Windows::Forms::Button());
			this->listView1 = (gcnew System::Windows::Forms::ListView());
			this->c_nonwork = (gcnew System::Windows::Forms::ColumnHeader());
			this->c_day = (gcnew System::Windows::Forms::ColumnHeader());
			this->c_mes = (gcnew System::Windows::Forms::ColumnHeader());
			this->b_ok = (gcnew System::Windows::Forms::Button());
			this->b_read = (gcnew System::Windows::Forms::Button());
			this->b_save = (gcnew System::Windows::Forms::Button());
			this->SuspendLayout();
			// 
			// b_nextSel
			// 
			this->b_nextSel->Location = System::Drawing::Point(275, 17);
			this->b_nextSel->Name = L"b_nextSel";
			this->b_nextSel->Size = System::Drawing::Size(24, 23);
			this->b_nextSel->TabIndex = 0;
			this->b_nextSel->Text = L"[";
			this->b_nextSel->UseVisualStyleBackColor = true;
			this->b_nextSel->Click += gcnew System::EventHandler(this, &NonWorking::b_nextSel_Click);
			// 
			// checkBox1
			// 
			this->checkBox1->AutoSize = true;
			this->checkBox1->Checked = true;
			this->checkBox1->CheckState = System::Windows::Forms::CheckState::Checked;
			this->checkBox1->Enabled = false;
			this->checkBox1->Location = System::Drawing::Point(305, 22);
			this->checkBox1->Name = L"checkBox1";
			this->checkBox1->Size = System::Drawing::Size(15, 14);
			this->checkBox1->TabIndex = 2;
			this->checkBox1->UseVisualStyleBackColor = true;
			// 
			// b_prevSel
			// 
			this->b_prevSel->Location = System::Drawing::Point(326, 17);
			this->b_prevSel->Name = L"b_prevSel";
			this->b_prevSel->Size = System::Drawing::Size(24, 23);
			this->b_prevSel->TabIndex = 3;
			this->b_prevSel->Text = L"]";
			this->b_prevSel->UseVisualStyleBackColor = true;
			this->b_prevSel->Click += gcnew System::EventHandler(this, &NonWorking::b_prevSel_Click);
			// 
			// b_prevUnsel
			// 
			this->b_prevUnsel->Location = System::Drawing::Point(326, 46);
			this->b_prevUnsel->Name = L"b_prevUnsel";
			this->b_prevUnsel->Size = System::Drawing::Size(24, 23);
			this->b_prevUnsel->TabIndex = 6;
			this->b_prevUnsel->Text = L"]";
			this->b_prevUnsel->UseVisualStyleBackColor = true;
			this->b_prevUnsel->Click += gcnew System::EventHandler(this, &NonWorking::b_prevUnsel_Click);
			// 
			// checkBox2
			// 
			this->checkBox2->AutoSize = true;
			this->checkBox2->Enabled = false;
			this->checkBox2->Location = System::Drawing::Point(305, 51);
			this->checkBox2->Name = L"checkBox2";
			this->checkBox2->Size = System::Drawing::Size(15, 14);
			this->checkBox2->TabIndex = 5;
			this->checkBox2->UseVisualStyleBackColor = true;
			// 
			// b_nextUnsel
			// 
			this->b_nextUnsel->Location = System::Drawing::Point(275, 46);
			this->b_nextUnsel->Name = L"b_nextUnsel";
			this->b_nextUnsel->Size = System::Drawing::Size(24, 23);
			this->b_nextUnsel->TabIndex = 4;
			this->b_nextUnsel->Text = L"[";
			this->b_nextUnsel->UseVisualStyleBackColor = true;
			this->b_nextUnsel->Click += gcnew System::EventHandler(this, &NonWorking::b_nextUnsel_Click);
			// 
			// listView1
			// 
			this->listView1->CheckBoxes = true;
			this->listView1->Columns->AddRange(gcnew cli::array< System::Windows::Forms::ColumnHeader^  >(3) {this->c_nonwork, this->c_day, 
				this->c_mes});
			this->listView1->FullRowSelect = true;
			this->listView1->Location = System::Drawing::Point(12, 17);
			this->listView1->MultiSelect = false;
			this->listView1->Name = L"listView1";
			this->listView1->Size = System::Drawing::Size(238, 278);
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
			this->c_day->Width = 100;
			// 
			// c_mes
			// 
			this->c_mes->Text = L"Mes";
			this->c_mes->Width = 75;
			// 
			// b_ok
			// 
			this->b_ok->Location = System::Drawing::Point(264, 272);
			this->b_ok->Name = L"b_ok";
			this->b_ok->Size = System::Drawing::Size(95, 23);
			this->b_ok->TabIndex = 8;
			this->b_ok->Text = L"Acceptar";
			this->b_ok->UseVisualStyleBackColor = true;
			this->b_ok->Click += gcnew System::EventHandler(this, &NonWorking::b_ok_Click);
			// 
			// b_read
			// 
			this->b_read->Location = System::Drawing::Point(264, 205);
			this->b_read->Name = L"b_read";
			this->b_read->Size = System::Drawing::Size(95, 23);
			this->b_read->TabIndex = 9;
			this->b_read->Text = L"Carregar dades";
			this->b_read->UseVisualStyleBackColor = true;
			this->b_read->Click += gcnew System::EventHandler(this, &NonWorking::b_read_Click);
			// 
			// b_save
			// 
			this->b_save->Location = System::Drawing::Point(264, 234);
			this->b_save->Name = L"b_save";
			this->b_save->Size = System::Drawing::Size(95, 23);
			this->b_save->TabIndex = 10;
			this->b_save->Text = L"Guardar dades";
			this->b_save->UseVisualStyleBackColor = true;
			this->b_save->Click += gcnew System::EventHandler(this, &NonWorking::b_save_Click);
			// 
			// NonWorking
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(6, 13);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(371, 307);
			this->Controls->Add(this->b_save);
			this->Controls->Add(this->b_read);
			this->Controls->Add(this->b_ok);
			this->Controls->Add(this->listView1);
			this->Controls->Add(this->b_prevUnsel);
			this->Controls->Add(this->checkBox2);
			this->Controls->Add(this->b_nextUnsel);
			this->Controls->Add(this->b_prevSel);
			this->Controls->Add(this->checkBox1);
			this->Controls->Add(this->b_nextSel);
			this->FormBorderStyle = System::Windows::Forms::FormBorderStyle::FixedDialog;
			this->MaximizeBox = false;
			this->Name = L"NonWorking";
			this->ShowIcon = false;
			this->StartPosition = System::Windows::Forms::FormStartPosition::CenterScreen;
			this->Text = L"Dies festius";
			this->ResumeLayout(false);
			this->PerformLayout();

		}
#pragma endregion
	private: System::Void b_ok_Click(System::Object^  sender, System::EventArgs^  e)
			 {
				saveMarkedDays();
				this->Close();
			 }
private: System::Void b_read_Click(System::Object^  sender, System::EventArgs^  e)
		 {
			 readFile();
		 }
private: System::Void b_save_Click(System::Object^  sender, System::EventArgs^  e)
		 {
			 saveFile();
		 }
private: System::Void b_nextSel_Click(System::Object^  sender, System::EventArgs^  e)
		 {
			 int i = this->listView1->SelectedIndices[0];
			 int max = this->listView1->Items->Count;
			 for(;i < max;i++)
				 this->listView1->Items[i]->Checked = true;
		 }
private: System::Void b_prevSel_Click(System::Object^  sender, System::EventArgs^  e)
		 {
			 int max = this->listView1->SelectedIndices[0];
			 for(int i = 0;i <= max;i++)
				 this->listView1->Items[i]->Checked = true;
		 }
private: System::Void b_nextUnsel_Click(System::Object^  sender, System::EventArgs^  e)
		 {
			 int i = this->listView1->SelectedIndices[0];
			 int max = this->listView1->Items->Count;
			 for(;i < max;i++)
				 this->listView1->Items[i]->Checked = false;
		 }
private: System::Void b_prevUnsel_Click(System::Object^  sender, System::EventArgs^  e)
		 {
			 int max = this->listView1->SelectedIndices[0];
			 for(int i = 0;i <= max;i++)
				 this->listView1->Items[i]->Checked = false;
		 }
};
}
