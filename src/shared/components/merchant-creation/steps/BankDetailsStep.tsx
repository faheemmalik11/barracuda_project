import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { StepComponentProps } from "@shared/types/merchant";

export function BankDetailsStep({ formData, updateFormData }: StepComponentProps) {
  const bankAccount = formData.bankAccount || {};

  const validateIBAN = (iban: string): boolean => {
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    if (cleanIban.length < 15 || cleanIban.length > 34) {
      return false;
    }
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/;
    return ibanRegex.test(cleanIban);
  };

  const handleIbanChange = (value: string, field: 'iban' | 'confirmIban') => {
    const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    updateFormData({ 
      bankAccount: { 
        ...bankAccount, 
        [field]: formatted 
      } 
    });
  };

  const isIbanValid = bankAccount.iban ? validateIBAN(bankAccount.iban) : true;
  const isConfirmIbanValid = bankAccount.confirmIban ? validateIBAN(bankAccount.confirmIban) : true;
  const ibanMatches = bankAccount.iban && bankAccount.confirmIban 
    ? bankAccount.iban.replace(/\s/g, '') === bankAccount.confirmIban.replace(/\s/g, '')
    : true;

  const currencies = [
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'SEK', label: 'Swedish Krona (SEK)' },
    { value: 'NOK', label: 'Norwegian Krone (NOK)' },
    { value: 'DKK', label: 'Danish Krone (DKK)' },
    { value: 'PLN', label: 'Polish Złoty (PLN)' },
    { value: 'CZK', label: 'Czech Koruna (CZK)' },
    { value: 'HUF', label: 'Hungarian Forint (HUF)' },
  ];

  const getIbanError = () => {
    if (bankAccount.iban && !isIbanValid) {
      return 'Please enter a valid IBAN number.';
    }
    return undefined;
  };

  const getConfirmIbanError = () => {
    if (bankAccount.confirmIban && !isConfirmIbanValid) {
      return 'Please enter a valid IBAN number.';
    }
    if (bankAccount.confirmIban && isConfirmIbanValid && !ibanMatches) {
      return 'IBAN numbers do not match.';
    }
    return undefined;
  };

  const ibanError = getIbanError();
  const confirmIbanError = getConfirmIbanError();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add an account for payouts</CardTitle>
        <p className="text-sm text-muted-foreground">Earnings that you receive will be sent to this account.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={bankAccount.currency}
            onValueChange={(value) => updateFormData({ 
              bankAccount: { ...bankAccount, currency: value } 
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Choose the currency for your payouts.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="iban">IBAN</Label>
          <Input
            id="iban"
            value={bankAccount.iban || ''}
            onChange={(e) => handleIbanChange(e.target.value, 'iban')}
            placeholder="e.g., DE89 3704 0044 0532 0130 00"
            maxLength={34}
            className={ibanError ? 'border-destructive' : ''}
          />
          {ibanError && <p className="text-sm text-destructive">{ibanError}</p>}
          <p className="text-sm text-muted-foreground">Enter your International Bank Account Number (IBAN).</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmIban">Confirm IBAN</Label>
          <Input
            id="confirmIban"
            value={bankAccount.confirmIban || ''}
            onChange={(e) => handleIbanChange(e.target.value, 'confirmIban')}
            placeholder="Re-enter your IBAN"
            maxLength={34}
            className={confirmIbanError ? 'border-destructive' : ''}
          />
          {confirmIbanError && <p className="text-sm text-destructive">{confirmIbanError}</p>}
          <p className="text-sm text-muted-foreground">Re-enter your IBAN to confirm it's correct.</p>
        </div>
      </CardContent>
    </Card>
  );
}
