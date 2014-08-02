#pragma once

#include "DaySelect.h"

namespace TMBViatges {

	using namespace System;
	using namespace System::ComponentModel;
	using namespace System::Collections;
	using namespace System::Windows::Forms;
	using namespace System::Data;
	using namespace System::Drawing;

	/// <summary>
	/// Resumen de Form1
	///
	/// ADVERTENCIA: si cambia el nombre de esta clase, deberá cambiar la
	///          propiedad 'Nombre de archivos de recursos' de la herramienta de compilación de recursos administrados
	///          asociada con todos los archivos .resx de los que depende esta clase. De lo contrario,
	///          los diseñadores no podrán interactuar correctamente con los
	///          recursos adaptados asociados con este formulario.
	/// </summary>
	public ref class Form1 : public System::Windows::Forms::Form
	{
	public:
		Form1(void)
		{
			InitializeComponent();
			//
			//TODO: agregar código de constructor aquí
			//
		}

	protected:
		/// <summary>
		/// Limpiar los recursos que se estén utilizando.
		/// </summary>
		~Form1()
		{
			if (components)
			{
				delete components;
			}
		}
	private: System::Windows::Forms::GroupBox^  gb_preus;
	private: System::Windows::Forms::TextBox^  tb_tjove;
	private: System::Windows::Forms::TextBox^  tb_t50;
	private: System::Windows::Forms::TextBox^  tb_t10;
	private: System::Windows::Forms::Label^  l_tjove;
	private: System::Windows::Forms::Label^  l_50;
	private: System::Windows::Forms::Label^  l_t10;
	private: System::Windows::Forms::Label^  l_viatgesdia;
	private: System::Windows::Forms::TextBox^  tb_lun;
	private: System::Windows::Forms::TextBox^  tb_mar;
	private: System::Windows::Forms::TextBox^  tb_mie;
	private: System::Windows::Forms::TextBox^  tb_jue;
	private: System::Windows::Forms::TextBox^  tb_vie;
	private: System::Windows::Forms::TextBox^  tb_sab;
	private: System::Windows::Forms::TextBox^  tb_dom;
	private: DaySelect^  f_dayselect;
	private: System::Windows::Forms::Panel^  gb_viatgesdia;
	private: System::Windows::Forms::Button^  b_selectdays;


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
			System::ComponentModel::ComponentResourceManager^  resources = (gcnew System::ComponentModel::ComponentResourceManager(Form1::typeid));
			this->gb_preus = (gcnew System::Windows::Forms::GroupBox());
			this->tb_tjove = (gcnew System::Windows::Forms::TextBox());
			this->tb_t50 = (gcnew System::Windows::Forms::TextBox());
			this->tb_t10 = (gcnew System::Windows::Forms::TextBox());
			this->l_tjove = (gcnew System::Windows::Forms::Label());
			this->l_50 = (gcnew System::Windows::Forms::Label());
			this->l_t10 = (gcnew System::Windows::Forms::Label());
			this->l_viatgesdia = (gcnew System::Windows::Forms::Label());
			this->tb_lun = (gcnew System::Windows::Forms::TextBox());
			this->tb_mar = (gcnew System::Windows::Forms::TextBox());
			this->tb_mie = (gcnew System::Windows::Forms::TextBox());
			this->tb_jue = (gcnew System::Windows::Forms::TextBox());
			this->tb_vie = (gcnew System::Windows::Forms::TextBox());
			this->tb_sab = (gcnew System::Windows::Forms::TextBox());
			this->tb_dom = (gcnew System::Windows::Forms::TextBox());
			this->gb_viatgesdia = (gcnew System::Windows::Forms::Panel());
			this->b_selectdays = (gcnew System::Windows::Forms::Button());
			this->gb_preus->SuspendLayout();
			this->gb_viatgesdia->SuspendLayout();
			this->SuspendLayout();
			// 
			// gb_preus
			// 
			this->gb_preus->Controls->Add(this->tb_tjove);
			this->gb_preus->Controls->Add(this->tb_t50);
			this->gb_preus->Controls->Add(this->tb_t10);
			this->gb_preus->Controls->Add(this->l_tjove);
			this->gb_preus->Controls->Add(this->l_50);
			this->gb_preus->Controls->Add(this->l_t10);
			this->gb_preus->Location = System::Drawing::Point(29, 12);
			this->gb_preus->Name = L"gb_preus";
			this->gb_preus->Size = System::Drawing::Size(218, 120);
			this->gb_preus->TabIndex = 0;
			this->gb_preus->TabStop = false;
			this->gb_preus->Text = L"Preus dels bitllets";
			// 
			// tb_tjove
			// 
			this->tb_tjove->Location = System::Drawing::Point(71, 79);
			this->tb_tjove->Name = L"tb_tjove";
			this->tb_tjove->Size = System::Drawing::Size(100, 20);
			this->tb_tjove->TabIndex = 5;
			// 
			// tb_t50
			// 
			this->tb_t50->Location = System::Drawing::Point(71, 52);
			this->tb_t50->Name = L"tb_t50";
			this->tb_t50->Size = System::Drawing::Size(100, 20);
			this->tb_t50->TabIndex = 4;
			// 
			// tb_t10
			// 
			this->tb_t10->Location = System::Drawing::Point(71, 25);
			this->tb_t10->Name = L"tb_t10";
			this->tb_t10->Size = System::Drawing::Size(100, 20);
			this->tb_t10->TabIndex = 3;
			// 
			// l_tjove
			// 
			this->l_tjove->AutoSize = true;
			this->l_tjove->Location = System::Drawing::Point(10, 82);
			this->l_tjove->Name = L"l_tjove";
			this->l_tjove->Size = System::Drawing::Size(40, 13);
			this->l_tjove->TabIndex = 2;
			this->l_tjove->Text = L"T-Jove";
			// 
			// l_50
			// 
			this->l_50->AutoSize = true;
			this->l_50->Location = System::Drawing::Point(10, 55);
			this->l_50->Name = L"l_50";
			this->l_50->Size = System::Drawing::Size(46, 13);
			this->l_50->TabIndex = 1;
			this->l_50->Text = L"T-50/30";
			// 
			// l_t10
			// 
			this->l_t10->AutoSize = true;
			this->l_t10->Location = System::Drawing::Point(10, 28);
			this->l_t10->Name = L"l_t10";
			this->l_t10->Size = System::Drawing::Size(29, 13);
			this->l_t10->TabIndex = 0;
			this->l_t10->Text = L"T-10";
			// 
			// l_viatgesdia
			// 
			this->l_viatgesdia->AutoSize = true;
			this->l_viatgesdia->Location = System::Drawing::Point(14, 16);
			this->l_viatgesdia->Name = L"l_viatgesdia";
			this->l_viatgesdia->Size = System::Drawing::Size(63, 13);
			this->l_viatgesdia->TabIndex = 1;
			this->l_viatgesdia->Text = L"Viatges/Dia";
			// 
			// tb_lun
			// 
			this->tb_lun->Location = System::Drawing::Point(88, 13);
			this->tb_lun->Name = L"tb_lun";
			this->tb_lun->Size = System::Drawing::Size(12, 20);
			this->tb_lun->TabIndex = 2;
			this->tb_lun->Text = L"2";
			this->tb_lun->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			// 
			// tb_mar
			// 
			this->tb_mar->Location = System::Drawing::Point(106, 13);
			this->tb_mar->Name = L"tb_mar";
			this->tb_mar->Size = System::Drawing::Size(12, 20);
			this->tb_mar->TabIndex = 3;
			this->tb_mar->Text = L"2";
			this->tb_mar->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			// 
			// tb_mie
			// 
			this->tb_mie->Location = System::Drawing::Point(124, 13);
			this->tb_mie->Name = L"tb_mie";
			this->tb_mie->Size = System::Drawing::Size(12, 20);
			this->tb_mie->TabIndex = 4;
			this->tb_mie->Text = L"2";
			this->tb_mie->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			// 
			// tb_jue
			// 
			this->tb_jue->Location = System::Drawing::Point(142, 13);
			this->tb_jue->Name = L"tb_jue";
			this->tb_jue->Size = System::Drawing::Size(12, 20);
			this->tb_jue->TabIndex = 5;
			this->tb_jue->Text = L"2";
			this->tb_jue->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			// 
			// tb_vie
			// 
			this->tb_vie->Location = System::Drawing::Point(160, 13);
			this->tb_vie->Name = L"tb_vie";
			this->tb_vie->Size = System::Drawing::Size(12, 20);
			this->tb_vie->TabIndex = 6;
			this->tb_vie->Text = L"2";
			this->tb_vie->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			// 
			// tb_sab
			// 
			this->tb_sab->Location = System::Drawing::Point(178, 13);
			this->tb_sab->Name = L"tb_sab";
			this->tb_sab->Size = System::Drawing::Size(12, 20);
			this->tb_sab->TabIndex = 7;
			this->tb_sab->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			// 
			// tb_dom
			// 
			this->tb_dom->Location = System::Drawing::Point(196, 13);
			this->tb_dom->Name = L"tb_dom";
			this->tb_dom->Size = System::Drawing::Size(12, 20);
			this->tb_dom->TabIndex = 8;
			this->tb_dom->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			// 
			// gb_viatgesdia
			// 
			this->gb_viatgesdia->Controls->Add(this->tb_lun);
			this->gb_viatgesdia->Controls->Add(this->tb_dom);
			this->gb_viatgesdia->Controls->Add(this->l_viatgesdia);
			this->gb_viatgesdia->Controls->Add(this->tb_sab);
			this->gb_viatgesdia->Controls->Add(this->tb_mar);
			this->gb_viatgesdia->Controls->Add(this->tb_vie);
			this->gb_viatgesdia->Controls->Add(this->tb_mie);
			this->gb_viatgesdia->Controls->Add(this->tb_jue);
			this->gb_viatgesdia->Location = System::Drawing::Point(12, 138);
			this->gb_viatgesdia->Name = L"gb_viatgesdia";
			this->gb_viatgesdia->Size = System::Drawing::Size(253, 46);
			this->gb_viatgesdia->TabIndex = 9;
			// 
			// b_selectdays
			// 
			this->b_selectdays->Location = System::Drawing::Point(29, 200);
			this->b_selectdays->Name = L"b_selectdays";
			this->b_selectdays->Size = System::Drawing::Size(101, 23);
			this->b_selectdays->TabIndex = 10;
			this->b_selectdays->Text = L"Seleccionar dia";
			this->b_selectdays->UseVisualStyleBackColor = true;
			this->b_selectdays->Click += gcnew System::EventHandler(this, &Form1::b_selectdays_Click);
			// 
			// Form1
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(6, 13);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(277, 331);
			this->Controls->Add(this->b_selectdays);
			this->Controls->Add(this->gb_viatgesdia);
			this->Controls->Add(this->gb_preus);
			this->Icon = (cli::safe_cast<System::Drawing::Icon^  >(resources->GetObject(L"$this.Icon")));
			this->Name = L"Form1";
			this->Text = L"PreusTMB";
			this->gb_preus->ResumeLayout(false);
			this->gb_preus->PerformLayout();
			this->gb_viatgesdia->ResumeLayout(false);
			this->gb_viatgesdia->PerformLayout();
			this->ResumeLayout(false);
		}
			
#pragma endregion
private: System::Void b_selectdays_Click(System::Object^  sender, System::EventArgs^  e)
		 {
			 this->f_dayselect = (gcnew DaySelect());
			 this->f_dayselect->Show();
		 }
};
}

