import { Injectable } from '@nestjs/common';
import { Context } from "telegraf";
import { Start, Ctx, Update, Command, Action, Hears } from "nestjs-telegraf";
import * as  path from "path";
import { createReadStream } from "fs";

import { CategoryService, ProductService } from '@modules';

@Injectable()
@Update()
export class BotService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService: ProductService
    ) { }

    @Start()
    async startBot(@Ctx() context: Context): Promise<void> {
        const imagePath = path.join(
            __dirname,
            "../../../",
            'public',
            'shiny_smile.jpg'
        )
        await context.replyWithPhoto(
            { source: createReadStream(imagePath), },
            {
                caption: `Welcome to Shiny Smile 😊
                \nCategories below 👇`,
                reply_markup: {
                    keyboard: [
                        [
                            { text: 'Categories' }
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }
        )
    }

    @Command("help")
    async helpCommand(@Ctx() context: Context): Promise<void> {
        context.replyWithHTML(`<b>Bot commands: </b>
        <i>/start - Start the bot</i>
        <i>/help - View bot commands</i>
        `)
    }

    @Hears("Categories")
    async getCategory(@Ctx() context: Context): Promise<void> {
        const imagePath = path.join(
            __dirname,
            "../../../",
            'public',
            'shiny_smile.jpg'
        )
        const categories = await this.categoryService.findAll()
        const inline_keyboard = [];
        categories.forEach(category => {
            inline_keyboard.push([{ text: category.name, callback_data: `category_${category.id}` }])
        })

        await context.replyWithPhoto(
            { source: createReadStream(imagePath) },
            {
                reply_markup: {
                    inline_keyboard,
                    resize_keyboard: true  
                }

            }
        )
    }

    @Action(/category_\d+/)
    async CategoryAction(@Ctx() context: Context): Promise<void> {
        const callbackQuery = context.callbackQuery;

        if ('data' in callbackQuery) {
            const callbackData = callbackQuery.data;
            const categoryId = callbackData?.split('_')[1];
            const products = await this.productService.getAllProductsByCategory(Number(categoryId));
            const inline_keyboard = []
            products.forEach(product => {
                inline_keyboard.push([{ text: product.name, callback_data: `product_${product.id}` }])
            })

            context.reply('Products', {
                reply_markup: {
                    inline_keyboard,
                    resize_keyboard: true,
                    one_time_keyboard: true
                },
            })

        }
    }

    @Action(/product_\d+/)
    async ProductAction(@Ctx() context: Context): Promise<void> {
        const callbackQuery = context.callbackQuery
        if ('data' in callbackQuery) {
            const callBack = callbackQuery.data
            const productId = callBack?.split('_')[1];
            const products = await this.productService.findAll()
            const product = []
            products.forEach(p => {
                if (p.id == Number(productId)) {
                    product.push({ id: p.id, description: p.description, image: p.image, price: p.price, name: p.name })
                }
            })
            const imagePath = path.join(
                __dirname,
                "../../../",
                "public",
                product[0].image
            );
            context.replyWithPhoto(
                { source: createReadStream(imagePath) },
                {
                    caption: `
Product name: ${product[0].name}
Price: ${product[0].price}
Description: ${product[0].description}
                    `,
                    reply_markup: {
                        inline_keyboard: [
                            [{ callback_data: "cart_add", text: "Add to cart" }]
                        ],
                        keyboard: [
                            [{ text: 'Place order' }, { text: "View cart" }]
                        ], resize_keyboard: true
                    }

                },

            )
        }
    }
}
