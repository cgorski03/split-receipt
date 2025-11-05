CREATE TABLE "receipt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"subtotal" numeric(10, 2),
	"tip" numeric(10, 2),
	"tax" numeric(10, 2),
	"grand_total" numeric(10, 2),
	"raw_parsing_response" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "receipt_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"receipt_id" uuid NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"raw_text" varchar(255),
	"interpreted_text" varchar(1027),
	"quantity" numeric(5, 2) DEFAULT '1'
);
--> statement-breakpoint
ALTER TABLE "receipt_item" ADD CONSTRAINT "receipt_item_receipt_id_receipt_id_fk" FOREIGN KEY ("receipt_id") REFERENCES "public"."receipt"("id") ON DELETE cascade ON UPDATE no action;