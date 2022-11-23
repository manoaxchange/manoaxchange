import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ItemsCollection. It encapsulates state and variable values for items.
 */
export const CATEGORIES = {
  books: 'Books',
  electronics: 'Electronics',
  clothing: 'Clothing',
  housewares: 'Housewares',
  transportation: 'Transportation',
  misc: 'Miscellaneous',
};

export const CATEGORIES_ARRAY = [
  CATEGORIES.books,
  CATEGORIES.electronics,
  CATEGORIES.clothing,
  CATEGORIES.housewares,
  CATEGORIES.transportation,
  CATEGORIES.misc,
];

class ItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      image: String,
      price: Number,
      description: String,
      name: String,
      owner: String,
      category: { type: String, allowedValues: CATEGORIES_ARRAY },
      sold: { type: Boolean, defaultValue: false },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Items = new ItemsCollection();
