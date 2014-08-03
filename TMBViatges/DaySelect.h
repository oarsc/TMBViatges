#pragma once

#include <ctype.h>
using namespace System;
using namespace System::ComponentModel;
using namespace System::Collections;
using namespace System::Windows::Forms;
using namespace System::Data;
using namespace System::Drawing;


namespace TMBViatges {

	/// <summary>
	/// Resumen de DaySelect
	///
	/// ADVERTENCIA: si cambia el nombre de esta clase, deberá cambiar la
	///          propiedad 'Nombre de archivos de recursos' de la herramienta de compilación de recursos administrados
	///          asociada con todos los archivos .resx de los que depende esta clase. De lo contrario,
	///          los diseñadores no podrán interactuar correctamente con los
	///          recursos adaptados asociados con este formulario.
	/// </summary>
	public ref class DaySelect : public System::Windows::Forms::Form
	{
	public:
		DaySelect(System::Windows::Forms::Form^ parent)
		{
			InitializeComponent();
			this->parent_form = parent;
			System::DateTime today = System::DateTime::Now.Date;
			this->dtp_first->MinDate = today;
			this->dtp_last->MinDate = today.AddDays(1);
			this->dtp_first->Value = today;
			this->dtp_last->Value = today.AddDays(90);
		}
		void sendDataToMain(int val);
	protected:
		/// <summary>
		/// Limpiar los recursos que se estén utilizando.
		/// </summary>
		~DaySelect()
		{
			if (components)
			{
				delete components;
			}
		}
	private: System::Windows::Forms::DateTimePicker^  dtp_first;
	private: System::Windows::Forms::DateTimePicker^  dtp_last;
	private: System::Windows::Forms::TextBox^  tb_days;
	private: System::Windows::Forms::Label^  l_add;
	private: System::Windows::Forms::Label^  l_days;
	private: System::Windows::Forms::Button^  b_add;
	private: System::Windows::Forms::Button^  b_confirm;
	private: System::Windows::Forms::Form^ parent_form;
	private: System::Windows::Forms::Label^  l_initdate;
	private: System::Windows::Forms::Label^  l_lastdate;



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
			this->dtp_first = (gcnew System::Windows::Forms::DateTimePicker());
			this->dtp_last = (gcnew System::Windows::Forms::DateTimePicker());
			this->tb_days = (gcnew System::Windows::Forms::TextBox());
			this->l_add = (gcnew System::Windows::Forms::Label());
			this->l_days = (gcnew System::Windows::Forms::Label());
			this->b_add = (gcnew System::Windows::Forms::Button());
			this->b_confirm = (gcnew System::Windows::Forms::Button());
			this->l_initdate = (gcnew System::Windows::Forms::Label());
			this->l_lastdate = (gcnew System::Windows::Forms::Label());
			this->SuspendLayout();
			// 
			// dtp_first
			// 
			this->dtp_first->Format = System::Windows::Forms::DateTimePickerFormat::Short;
			this->dtp_first->Location = System::Drawing::Point(85, 19);
			this->dtp_first->MaxDate = System::DateTime(2999, 12, 30, 0, 0, 0, 0);
			this->dtp_first->Name = L"dtp_first";
			this->dtp_first->Size = System::Drawing::Size(98, 20);
			this->dtp_first->TabIndex = 0;
			this->dtp_first->ValueChanged += gcnew System::EventHandler(this, &DaySelect::dtp_first_ValueChanged);
			// 
			// dtp_last
			// 
			this->dtp_last->Format = System::Windows::Forms::DateTimePickerFormat::Short;
			this->dtp_last->Location = System::Drawing::Point(85, 102);
			this->dtp_last->MaxDate = System::DateTime(2999, 12, 31, 0, 0, 0, 0);
			this->dtp_last->Name = L"dtp_last";
			this->dtp_last->Size = System::Drawing::Size(98, 20);
			this->dtp_last->TabIndex = 1;
			// 
			// tb_days
			// 
			this->tb_days->Location = System::Drawing::Point(81, 71);
			this->tb_days->Name = L"tb_days";
			this->tb_days->Size = System::Drawing::Size(27, 20);
			this->tb_days->TabIndex = 2;
			this->tb_days->Text = L"90";
			this->tb_days->TextAlign = System::Windows::Forms::HorizontalAlignment::Center;
			this->tb_days->KeyPress += gcnew System::Windows::Forms::KeyPressEventHandler(this, &DaySelect::tb_days_KeyPress);
			// 
			// l_add
			// 
			this->l_add->AutoSize = true;
			this->l_add->Location = System::Drawing::Point(33, 74);
			this->l_add->Name = L"l_add";
			this->l_add->Size = System::Drawing::Size(42, 13);
			this->l_add->TabIndex = 4;
			this->l_add->Text = L"Afegeix";
			// 
			// l_days
			// 
			this->l_days->AutoSize = true;
			this->l_days->Location = System::Drawing::Point(111, 74);
			this->l_days->Name = L"l_days";
			this->l_days->Size = System::Drawing::Size(26, 13);
			this->l_days->TabIndex = 5;
			this->l_days->Text = L"dies";
			// 
			// b_add
			// 
			this->b_add->Location = System::Drawing::Point(143, 69);
			this->b_add->Name = L"b_add";
			this->b_add->Size = System::Drawing::Size(40, 23);
			this->b_add->TabIndex = 6;
			this->b_add->Text = L"Ok";
			this->b_add->UseVisualStyleBackColor = true;
			this->b_add->Click += gcnew System::EventHandler(this, &DaySelect::b_add_Click);
			// 
			// b_confirm
			// 
			this->b_confirm->Location = System::Drawing::Point(62, 144);
			this->b_confirm->Name = L"b_confirm";
			this->b_confirm->Size = System::Drawing::Size(75, 23);
			this->b_confirm->TabIndex = 7;
			this->b_confirm->Text = L"Acceptar";
			this->b_confirm->UseVisualStyleBackColor = true;
			this->b_confirm->Click += gcnew System::EventHandler(this, &DaySelect::b_confirm_Click);
			// 
			// l_initdate
			// 
			this->l_initdate->AutoSize = true;
			this->l_initdate->Location = System::Drawing::Point(21, 25);
			this->l_initdate->Name = L"l_initdate";
			this->l_initdate->Size = System::Drawing::Size(62, 13);
			this->l_initdate->TabIndex = 8;
			this->l_initdate->Text = L"Data inicial:";
			// 
			// l_lastdate
			// 
			this->l_lastdate->AutoSize = true;
			this->l_lastdate->Location = System::Drawing::Point(28, 108);
			this->l_lastdate->Name = L"l_lastdate";
			this->l_lastdate->Size = System::Drawing::Size(55, 13);
			this->l_lastdate->TabIndex = 9;
			this->l_lastdate->Text = L"Data final:";
			// 
			// DaySelect
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(6, 13);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(206, 181);
			this->Controls->Add(this->l_lastdate);
			this->Controls->Add(this->l_initdate);
			this->Controls->Add(this->b_confirm);
			this->Controls->Add(this->b_add);
			this->Controls->Add(this->l_days);
			this->Controls->Add(this->l_add);
			this->Controls->Add(this->tb_days);
			this->Controls->Add(this->dtp_last);
			this->Controls->Add(this->dtp_first);
			this->FormBorderStyle = System::Windows::Forms::FormBorderStyle::FixedDialog;
			this->MaximizeBox = false;
			this->Name = L"DaySelect";
			this->StartPosition = System::Windows::Forms::FormStartPosition::CenterParent;
			this->Text = L"DaySelect";
			this->ResumeLayout(false);
			this->PerformLayout();

		}
#pragma endregion
	private: System::Void tb_days_KeyPress(System::Object^  sender, System::Windows::Forms::KeyPressEventArgs^  e)
			 {
				 e->Handled = !(isdigit(e->KeyChar) || e->KeyChar == (char)8);
			 }
	private: System::Void b_add_Click(System::Object^  sender, System::EventArgs^  e)
			 {
				 this->dtp_last->Value = this->dtp_first->Value.AddDays(int::Parse(this->tb_days->Text));
			 }
	private: System::Void dtp_first_ValueChanged(System::Object^  sender, System::EventArgs^  e)
			 {
				 this->dtp_last->MinDate = this->dtp_first->Value.AddDays(1);
			 }
	private: System::Void b_confirm_Click(System::Object^  sender, System::EventArgs^  e)
			 {
				 System::TimeSpan ts = (this->dtp_last->Value - this->dtp_first->Value);
				 sendDataToMain((int)ts.TotalDays);
				 this->Close();
			 }
};
}
