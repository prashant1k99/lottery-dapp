use anchor_lang::prelude::*;

declare_id!("FEDUDry6bZTsd8qGXZFqDYPCboWEzEKgDTy3H6yR57nx");

const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[program]
pub mod lottery_dapp {
    use super::*;

    pub fn initialize_config(
        ctx: Context<Initialize>,
        start_time: u64,
        end_time: u64,
        price: u64,
    ) -> Result<()> {
        *ctx.accounts.token_lottery = TokenLottery {
            bump: ctx.bumps.token_lottery,
            winner_chosen: false,
            start_time,
            end_time,
            ticket_price: price,
            authority: *ctx.accounts.payer.key,
            randomness_account: Pubkey::default(),
            winner: 0,
            lottery_pot_amount: 0,
        };

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        payer = payer,
        space = ANCHOR_DISCRIMINATOR_SIZE + TokenLottery::INIT_SPACE,
        seeds = [b"token_lottery".as_ref()],
        bump
    )]
    pub token_lottery: Account<'info, TokenLottery>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct TokenLottery {
    pub bump: u8,
    pub winner: u64,
    pub winner_chosen: bool,
    pub start_time: u64,
    pub end_time: u64,
    pub lottery_pot_amount: u64,
    pub ticket_price: u64,
    pub authority: Pubkey,
    pub randomness_account: Pubkey,
}
