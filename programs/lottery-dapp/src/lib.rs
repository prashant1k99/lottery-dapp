use anchor_lang::prelude::*;

declare_id!("FEDUDry6bZTsd8qGXZFqDYPCboWEzEKgDTy3H6yR57nx");

#[program]
pub mod lottery_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
