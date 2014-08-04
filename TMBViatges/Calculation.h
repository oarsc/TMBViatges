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
	private: System::Windows::Forms::ListView^ listView1;



	protected: 

	private:
		System::ComponentModel::Container ^components;
		//T-10
		unsigned int tickets10;
		unsigned int falten10;
		float cost10;
		//T-50/30
		unsigned int tickets50;
		unsigned int falten30;
		unsigned int falten50;
		float cost50;
		System::Collections::Generic::Dictionary<int,int> perduts50;
		//T-Jove / T-Trimestre
		unsigned int tickets90;
		unsigned int falten90;
		float cost90;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Método necesario para admitir el Diseñador. No se puede modificar
		/// el contenido del método con el editor de código.
		/// </summary>
		void InitializeComponent(void)
		{
			System::Windows::Forms::ColumnHeader^  columnHeader1;
			this->listView1 = (gcnew System::Windows::Forms::ListView());
			columnHeader1 = (gcnew System::Windows::Forms::ColumnHeader());
			this->SuspendLayout();
			// 
			// columnHeader1
			// 
			columnHeader1->Width = 1000;
			// 
			// listView1
			// 
			this->listView1->Activation = System::Windows::Forms::ItemActivation::OneClick;
			this->listView1->BorderStyle = System::Windows::Forms::BorderStyle::None;
			this->listView1->Columns->AddRange(gcnew cli::array< System::Windows::Forms::ColumnHeader^  >(1) {columnHeader1});
			this->listView1->Enabled = false;
			this->listView1->FullRowSelect = true;
			this->listView1->HeaderStyle = System::Windows::Forms::ColumnHeaderStyle::Nonclickable;
			this->listView1->Location = System::Drawing::Point(13, 13);
			this->listView1->Name = L"listView1";
			this->listView1->Size = System::Drawing::Size(344, 454);
			this->listView1->TabIndex = 0;
			this->listView1->UseCompatibleStateImageBehavior = false;
			this->listView1->View = System::Windows::Forms::View::SmallIcon;
			// 
			// Calculation
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(6, 13);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(369, 479);
			this->Controls->Add(this->listView1);
			this->Name = L"Calculation";
			this->StartPosition = System::Windows::Forms::FormStartPosition::CenterParent;
			this->Text = L"Calculation";
			this->ResumeLayout(false);

		}
#pragma endregion
	};
}
