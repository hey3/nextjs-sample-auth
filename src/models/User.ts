import { getModelForClass, prop } from '@typegoose/typegoose'

class User {
  @prop()
  public name!: string

  @prop()
  public email!: string

  @prop({ default: Date.now() })
  public createAt!: Date

  @prop()
  public passwordId!: string
}

export default getModelForClass(User)
