#include "StdAfx.h"
#include "Calculation.h"
#include "Form1.h"
#include "NonWorking.h"

void TMBViatges::Calculation::calculatePrices()
{
	System::Windows::Forms::ListView::CheckedIndexCollection^ nw_days = TMBViatges::NonWorking::nw_days;
	int* weektrips = TMBViatges::Form1::trips_day;
	int days = TMBViatges::Form1::countdays;
	System::DateTime thisDay = TMBViatges::Form1::first_countday;

	float preuT10 = TMBViatges::Form1::price10;
	float preuT50 = TMBViatges::Form1::price50;
	float preuTJ = TMBViatges::Form1::price90;

	tickets10 = 0;
	falten10 = 0;
	cost10 = 0;
	tickets50 = 0;
	falten30 = ~0;
	falten50 = 0;
	cost50 = 0;
	perduts50.Clear();
	tickets90 = 0;
	falten90 = 0;
	cost90 = 0;

	unsigned int dayCost; bool festa;
	for (int i=0; i<days; i++)
	{
		dayCost = weektrips[(int)thisDay.DayOfWeek];
		festa = (nw_days != nullptr && nw_days->Contains(i));
		if (!festa && dayCost > 0)
		{
			
			while (falten10 < dayCost)
			{
				falten10 += 10;
				cost10 += preuT10;
				tickets10++;
			}
			///
			if ((falten30 < 1) && (falten50 > dayCost))
			{
				perduts50.Add(tickets50,falten50);
				falten50 = 0;
			}
			while (falten50 < dayCost)
			{
				falten30 = 30;
				falten50 += 50;
				cost50 += preuT50;
				tickets50++;
			}
			if (falten90 < 1)
			{
				falten90 = 90;
				cost90 += preuTJ;
				tickets90++;
			}
			falten10-=dayCost;
			falten50-=dayCost;
		}
		falten30--;
		falten90--;
		thisDay=thisDay.AddDays(1);
	}

	if ((falten30 > 30) || (falten30 < 1))
		falten30 = 0;

	if (falten90 < 0)
		falten90 = 0;
}


void addLine(System::Windows::Forms::ListView^ lv, System::String^ str)
{
	ListViewItem^ item = gcnew ListViewItem();
	item->Text = str;
	lv->Items->Add(item);
}

void TMBViatges::Calculation::showResults()
{
	addLine(this->listView1,L"Preus T-10");
	addLine(this->listView1,L"Targetes: "+tickets10);
	addLine(this->listView1,L"Preu: "+cost10+"€");
	addLine(this->listView1,L"Sobren "+falten10+" viatges");
	addLine(this->listView1,L"");
	addLine(this->listView1,L"Preus T-50/30");
	addLine(this->listView1,L"Targetes: "+tickets50);
	addLine(this->listView1,L"Preu: "+cost50+"€");
	addLine(this->listView1,L"######## "+perduts50.Count);

	for each(int i in perduts50.Keys)
	{
		addLine(this->listView1,L"En la targeta "+i+" s'han perdut "+perduts50[i]+" viatges");
	}
	addLine(this->listView1,L"");
}