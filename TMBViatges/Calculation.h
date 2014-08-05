#pragma once

using namespace System;
using namespace System::ComponentModel;
using namespace System::Collections;
using namespace System::Windows::Forms;
using namespace System::Data;
using namespace System::Drawing;


namespace TMBViatges {

	/// <summary>
	/// Resumen de Calculation
	///
	/// ADVERTENCIA: si cambia el nombre de esta clase, deberá cambiar la
	///          propiedad 'Nombre de archivos de recursos' de la herramienta de compilación de recursos administrados
	///          asociada con todos los archivos .resx de los que depende esta clase. De lo contrario,
	///          los diseñadores no podrán interactuar correctamente con los
	///          recursos adaptados asociados con este formulario.
	/// </summary>
	public ref class Calculation : public System::Windows::Forms::Form
	{
	public:
		Calculation(void)
		{
			InitializeComponent();
			calculatePrices();
			showResults();
		}
		void calculatePrices();
		void showResults();
		void addLine(System::String^ str);

	protected:
		/// <summary>
		/// Limpiar los recursos que se estén utilizando.
		/// </summary>
		~Calculation()
		{
			if (components)
			{
				delete components;
			}
		}




	protected: 

	private:
		System::ComponentModel::Container ^components;
		//T-10
		int tickets10;
		int falten10;
		float cost10;
		//T-50/30
		int tickets50;
		int falten30;
		int falten50;
		float cost50;
		System::Collections::Generic::Dictionary<int,int> perduts50;
		//T-Jove / T-Trimestre
		int tickets90;
		int falten90;
	private: System::Windows::Forms::TextBox^  textBox1;

			 float cost90;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Método necesario para admitir el Diseñador. No se puede modificar
		/// el contenido del método con el editor de código.
		/// </summary>
		void InitializeComponent(void)
		{
			System::ComponentModel::ComponentResourceManager^  resources = (gcnew System::ComponentModel::ComponentResourceManager(Calculation::typeid));
			this->textBox1 = (gcnew System::Windows::Forms::TextBox());
			this->SuspendLayout();
			// 
			// textBox1
			// 
			this->textBox1->AcceptsTab = true;
			this->textBox1->BorderStyle = System::Windows::Forms::BorderStyle::None;
			this->textBox1->Cursor = System::Windows::Forms::Cursors::Arrow;
			this->textBox1->Font = (gcnew System::Drawing::Font(L"Segoe UI", 10));
			this->textBox1->Location = System::Drawing::Point(12, 12);
			this->textBox1->Multiline = true;
			this->textBox1->Name = L"textBox1";
			this->textBox1->ReadOnly = true;
			this->textBox1->Size = System::Drawing::Size(372, 408);
			this->textBox1->TabIndex = 0;
			// 
			// Calculation
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(6, 13);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(390, 432);
			this->Controls->Add(this->textBox1);
			this->FormBorderStyle = System::Windows::Forms::FormBorderStyle::FixedDialog;
			this->Icon = (cli::safe_cast<System::Drawing::Icon^  >(resources->GetObject(L"$this.Icon")));
			this->Name = L"Calculation";
			this->StartPosition = System::Windows::Forms::FormStartPosition::CenterParent;
			this->Text = L"Resultats";
			this->ResumeLayout(false);
			this->PerformLayout();

		}
#pragma endregion
	};
}
