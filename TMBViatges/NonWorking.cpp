#include "StdAfx.h"
#include "NonWorking.h"
#include "Form1.h"

void TMBViatges::NonWorking::initList()
{
	System::DateTime temp = TMBViatges::Form1::first_countday;
	for (int i=0;i<TMBViatges::Form1::countdays;i++)
	{
		ListViewItem^ item1 = gcnew ListViewItem();
		System::String^ day = (temp.Day<10)?L"0"+temp.Day:L""+temp.Day;
		switch (temp.DayOfWeek)
		{
			case System::DayOfWeek::Monday:
				item1->SubItems->Add(L"Dilluns · "+day);break;
			case System::DayOfWeek::Tuesday:
				item1->SubItems->Add(L"Dimarts · "+day);break;
			case System::DayOfWeek::Wednesday:
				item1->SubItems->Add(L"Dimecres · "+day);break;
			case System::DayOfWeek::Thursday:
				item1->SubItems->Add(L"Dijous · "+day);break;
			case System::DayOfWeek::Friday:
				item1->SubItems->Add(L"Divendres · "+day);break;
			case System::DayOfWeek::Saturday:
				item1->SubItems->Add(L"Dissabte · "+day);break;
			case System::DayOfWeek::Sunday:
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
