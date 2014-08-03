#include "StdAfx.h"
#include "NonWorking.h"
#include "Form1.h"


void TMBViatges::NonWorking::sendMarkedDays()
{
	TMBViatges::Form1^ a = (TMBViatges::Form1^) parent_form;
	a->updateNWDays(this->listView1->CheckedIndices);
}
