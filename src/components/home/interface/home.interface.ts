export interface TrustedCardType {
    name: string;
    image: string;
}

export interface HomeData {
    trusted_cards: TrustedCardType[];
    
}