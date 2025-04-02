
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TokenConfig, defaultTokenConfig } from '@/utils/tokenHelpers';
import { Coins, Upload } from 'lucide-react';

interface TokenFormProps {
  tokenConfig: TokenConfig;
  onChange: (config: TokenConfig) => void;
}

const TokenForm: React.FC<TokenFormProps> = ({ tokenConfig, onChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let finalValue: string | number = value;
    
    // Convert to number if we expect a number field
    if (name === 'totalSupply' || name === 'decimals') {
      finalValue = value === '' ? 0 : Number(value);
    }
    
    onChange({
      ...tokenConfig,
      [name]: finalValue,
    });
  };

  const handleSupplyChange = (value: number[]) => {
    onChange({
      ...tokenConfig,
      totalSupply: value[0],
    });
  };

  const handleDecimalsChange = (value: number[]) => {
    onChange({
      ...tokenConfig,
      decimals: value[0],
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a URL for the file preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    onChange({
      ...tokenConfig,
      logoUrl: url,
    });
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-solana-purple" />
          <span>Token Configuration</span>
        </CardTitle>
        <CardDescription>
          Define the basic properties of your token
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Token Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="e.g. Solana Forge Token" 
              value={tokenConfig.name} 
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="symbol">Token Symbol</Label>
            <Input 
              id="symbol" 
              name="symbol" 
              placeholder="e.g. SFT" 
              maxLength={5}
              value={tokenConfig.symbol} 
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="totalSupply">Total Supply</Label>
            <span className="text-sm text-muted-foreground">
              {tokenConfig.totalSupply.toLocaleString()}
            </span>
          </div>
          <Slider
            id="totalSupply"
            name="totalSupply"
            min={100000}
            max={10000000000}
            step={100000}
            value={[tokenConfig.totalSupply]}
            onValueChange={handleSupplyChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="decimals">Decimals</Label>
            <span className="text-sm text-muted-foreground">{tokenConfig.decimals}</span>
          </div>
          <Slider
            id="decimals"
            name="decimals"
            min={0}
            max={18}
            step={1}
            value={[tokenConfig.decimals]}
            onValueChange={handleDecimalsChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            placeholder="Describe your token's purpose and utility" 
            rows={3}
            value={tokenConfig.description} 
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Token Logo</Label>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-white/10">
              {previewUrl ? (
                <img src={previewUrl} alt="Token logo preview" className="h-full w-full object-cover" />
              ) : (
                <Coins className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <Button variant="outline" className="w-full" asChild>
                <label className="cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Logo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended: 512x512px PNG or SVG
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenForm;
