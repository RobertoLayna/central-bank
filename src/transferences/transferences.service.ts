import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransferenceDto } from './dto/create-transference.dto';
import { UpdateTransferenceDto } from './dto/update-transference.dto';
import { Transference } from './entities/transference.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Card } from 'src/accounts/entities/card.entity';

@Injectable()
export class TransferencesService {

  constructor(
    @InjectRepository(Transference)
    private transferRepository: Repository<Transference>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) { }

  async create(id_user: number, createTransferenceDto: CreateTransferenceDto) {
    const sender = await this.accountRepository.findOne({
      where: { id_user: id_user }, relations: {
        card: true,
      }
    });

    const receptorCard = await this.cardRepository.findOne({ where: [{ card: createTransferenceDto.receptor_account }, { card_account: createTransferenceDto.receptor_account }] })

    if (!receptorCard) throw new UnauthorizedException('No account associated to receptor')
    const receptor = await this.accountRepository.findOne({
      where: { id: receptorCard.id_account }, relations: {
        card: true,
      }
    });

    if (sender.card[0].card == createTransferenceDto.user_account || sender.card[0].card_account == createTransferenceDto.user_account) {
      if (receptor.card[0].card == createTransferenceDto.receptor_account || sender.card[0].card_account == createTransferenceDto.receptor_account) {
        if (sender.balance > createTransferenceDto.amount) {
          this.accountRepository.update({ id_user: sender.id_user }, { balance: (sender.balance - createTransferenceDto.amount) })
          this.accountRepository.update({ id_user: receptor.id_user }, { balance: (receptor.balance + createTransferenceDto.amount) })
          this.transferRepository.save({ id_receptor: receptor.id_user, id_sender: id_user, receptor_account: createTransferenceDto.receptor_account, sender_account: createTransferenceDto.user_account, amount: createTransferenceDto.amount })
        } else {
          throw new UnauthorizedException('insufficient funds')
        }
      } else {
        throw new UnauthorizedException('No account associated to receptor')
      }
    } else {
      throw new UnauthorizedException('No account associated to user')
    }
    return 'Complete';
  }

  findAll(id: number) {
    return this.transferRepository.find({ select: { amount: true, id: true }, where: [{ id_sender: id }, { id_receptor: id }] });
  }

  findOne(id: number) {
    return this.transferRepository.findOne({ where: { id: id } });
  }
}
