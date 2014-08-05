#include "StdAfx.h"
#include "Calculation.h"
#include "Form1.h"
#include "NonWorking.h"


void TMBViatges::Calculation::addLine(String^ str)
{
	this->textBox1->AppendText(str + Environment::NewLine);
}

void TMBViatges::Calculation::calculatePrices()
{
	ListView::CheckedIndexCollection^ nw_days = TMBViatges::NonWorking::nw_days;
	int* weektrips = TMBViatges::Form1::trips_day;
	int days = TMBViatges::Form1::countdays;
	DateTime thisDay = TMBViatges::Form1::first_countday;

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

	int dayCost; bool festa;
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

void TMBViatges::Calculation::showResults()
{
	String^ str;
	DateTime endDay = TMBViatges::Form1::first_countday.AddDays(TMBViatges::Form1::countdays);
	addLine(L"Preus T-10");
	addLine(String::Format(L"Targetes: {0}	Preu: {1,2:f} €",tickets10,cost10));
	if (falten10>1)
		addLine(L"   Sobren "+falten10+" viatges a partir del dia "+endDay.ToString(L"dd/MM/yyyy"));
	else if(falten10==1)
		addLine(L"   Sobra 1 viatge a partir del dia "+endDay.ToString(L"dd/MM/yyyy"));
	else
		addLine(L"   No ha sobrat cap viatge");
	addLine(Environment::NewLine);

	addLine(L"Preus T-50/30");
	addLine(String::Format(L"Targetes: {0}	Preu: {1,2:f} €",tickets50,cost50));
	for each(int i in perduts50.Keys)
		addLine(L"   En la targeta "+i+" s'han perdut "+perduts50[i]+" viatges");
	if(falten30==1)
		str = "Sobra 1 dia";
	else
		str = "Sobren "+falten30+" dies";
	if(falten50==1)
			addLine(L"   "+str+" i 1 viatge a partir del dia "+endDay.ToString(L"dd/MM/yyyy"));
	else
			addLine(L"   "+str+" i "+falten50+" viatges a partir del dia "+endDay.ToString(L"dd/MM/yyyy"));
	addLine(Environment::NewLine);

	addLine(L"Preus T-Jove");
	addLine(String::Format(L"Targetes: {0}	Preu: {1,2:f} €",tickets90,cost90));
	if (falten90>1)
		this->textBox1->AppendText(L"   Sobren "+falten90+" dies");
	else if(falten90==1)
		this->textBox1->AppendText(L"   Sobra 1 dia");
	else
		this->textBox1->AppendText(L"   No sobra cap dia");

	if (textBox1->Lines->Length >= 25)
		textBox1->ScrollBars = ScrollBars::Vertical;
	else
		textBox1->ScrollBars = ScrollBars::None;
}