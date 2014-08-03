#include "StdAfx.h"
#include "DaySelect.h"
#include "Form1.h"


void TMBViatges::DaySelect::sendDataToMain(int val)
{
	TMBViatges::Form1^ a = (TMBViatges::Form1^) parent_form;
	a->updateDays(this->dtp_first->Value,val);
}
