#include "StdAfx.h"
#include "NonWorking.h"
#include "Form1.h"

void TMBViatges::NonWorking::initList()
{
	DateTime temp = TMBViatges::Form1::first_countday;
	for (int i=0;i<TMBViatges::Form1::countdays;i++)
	{
		ListViewItem^ item1 = gcnew ListViewItem();
		String^ day = (temp.Day<10)?L"0"+temp.Day:L""+temp.Day;
		switch (temp.DayOfWeek)
		{
			case DayOfWeek::Monday:
				item1->SubItems->Add(L"Dilluns · "+day);break;
			case DayOfWeek::Tuesday:
				item1->SubItems->Add(L"Dimarts · "+day);break;
			case DayOfWeek::Wednesday:
				item1->SubItems->Add(L"Dimecres · "+day);break;
			case DayOfWeek::Thursday:
				item1->SubItems->Add(L"Dijous · "+day);break;
			case DayOfWeek::Friday:
				item1->SubItems->Add(L"Divendres · "+day);break;
			case DayOfWeek::Saturday:
				item1->SubItems->Add(L"Dissabte · "+day);break;
			case DayOfWeek::Sunday:
				item1->SubItems->Add(L"Diumenge · "+day);break;
		}
		switch (temp.Month)
		{
			case 1: item1->SubItems->Add(L"Gener");break;
			case 2: item1->SubItems->Add(L"Febrer");break;
			case 3: item1->SubItems->Add(L"Març");break;
			case 4: item1->SubItems->Add(L"Abril");break;
			case 5: item1->SubItems->Add(L"Maig");break;
			case 6: item1->SubItems->Add(L"Juny");break;
			case 7: item1->SubItems->Add(L"Juliol");break;
			case 8: item1->SubItems->Add(L"Agost");break;
			case 9: item1->SubItems->Add(L"Setembre");break;
			case 10:item1->SubItems->Add(L"Octubre");break;
			case 11:item1->SubItems->Add(L"Novembre");break;
			case 12:item1->SubItems->Add(L"Desembre");break;
		}
		this->listView1->Items->Add(item1);
		temp = temp.AddDays(1);
	}
	if (this->nw_days != nullptr)
		for (int i=0; i< this->nw_days->Count; i++)
			this->listView1->Items[this->nw_days[i]]->Checked = true;
}

void TMBViatges::NonWorking::saveMarkedDays()
{
	this->nw_days = this->listView1->CheckedIndices;
}

void TMBViatges::NonWorking::readFile()
{
	IO::FileInfo ^ fleMembers = gcnew IO::FileInfo(L"DadesFestes");
	if (fleMembers->Exists == false)
	{
		MessageBox::Show("No hi han dades a carregar","Sense dades");
		return;
	}

	for each (ListViewItem^ item in this->listView1->Items)
		item->Checked=false;

	DateTime first = TMBViatges::Form1::first_countday;

	IO::StreamReader^ din = IO::File::OpenText(L"DadesFestes");
	String^ line;
	while ((line = din->ReadLine()) != nullptr) 
	{
		for each (String^ date in line->Split('O'))
		{			
			DateTime dt = DateTime(int::Parse(date->Substring(0,4)),int::Parse(date->Substring(4,2)),int::Parse(date->Substring(6,2)));
			this->listView1->Items[(dt-first).TotalDays]->Checked=true;
		}
	}
	din->Close();
}

void TMBViatges::NonWorking::saveFile()
{
	DateTime first = TMBViatges::Form1::first_countday;

	IO::FileInfo ^ fleMembers = gcnew IO::FileInfo(L"DadesFestes");

	if (fleMembers->Exists == true && MessageBox::Show("S'havia guardat prèviament una altra versió de dades de festa.\r\nVols sobreescriure les dades?\r\nEn cas negatiu, no es guardaran les dades.", 
		 "Sobreescriure dades", MessageBoxButtons::YesNo,MessageBoxIcon::Question) == ::DialogResult::No)
		return;

	IO::StreamWriter^ sw = gcnew IO::StreamWriter(L"DadesFestes");
	bool firstdate = true;
	for each (int idx in this->listView1->CheckedIndices)
	{
		if (firstdate) firstdate = false;
		else sw->Write(L"O");
		sw->Write(first.AddDays(idx).ToString("yyyyMMdd"));
	}
	sw->Close();
}

