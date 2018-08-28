module Devs.RecipeDecode exposing ( sourceEncoder,recipeEncoder,imageEncoder,tagtypeDecoder,recipeLightDecoder,recipeDecoder,unitDecoder,sourceDecoder,tagDecoder )

import Json.Decode as Decode exposing (Decoder, field, succeed)
import Json.Decode.Extra exposing ((|:))
import Json.Encode as Encode exposing (..)
import Json.Encode.Extra as JsonE exposing (..)

import Devs.Objects as Objects exposing (..)

encodeString: Maybe String -> Encode.Value
encodeString str = case str of
  Just val -> if String.isEmpty val
    then Encode.null
    else Encode.string val
  Nothing -> Encode.null

encodeInt: Maybe Int -> Encode.Value
encodeInt str = case str of
  Just val -> Encode.int val
  Nothing -> Encode.null

encodeFloat: Maybe Float -> Encode.Value
encodeFloat str = case str of
  Just val -> Encode.float val
  Nothing -> Encode.null

imageEncoder: ImagePortData -> Encode.Value
imageEncoder img = Encode.object [ ( "contents", Encode.string img.contents )
  , ( "filename", Encode.string img.filename )
  ]

recipeEncoder: Recipe -> Encode.Value
recipeEncoder rec =
    let
      list =
          [ ( "id", case rec.id of
            Just val -> Encode.int val
            Nothing -> Encode.null )
          , ( "name", Encode.string rec.name )
          , ( "aikz", Encode.int rec.aikz )
          , ( "image", encodeString rec.image )
          , ( "translate", encodeString rec.translate )
          , ( "number_comment", encodeString rec.number_comment )
          , ( "number", encodeInt rec.number )
          , ( "nv_size", encodeInt rec.nv_size )
          , ( "source_page", encodeInt rec.source_page )
          , ( "nv_carbohydrates", encodeFloat rec.nv_carbohydrates )
          , ( "nv_energy", encodeFloat rec.nv_energy )
          , ( "nv_fat", encodeFloat rec.nv_fat )
          , ( "nv_protein", encodeFloat rec.nv_protein )
          , ( "source", case rec.source of
            Just val -> sourceEncoder val
            Nothing -> Encode.null )
          , ( "ingredients", case rec.ingredients of
            Just list -> Encode.list (List.map ingreEncoder list)
            Nothing -> Encode.null )
          , ( "tags", case rec.tags of
            Just list -> Encode.list (List.map tagEncoder list)
            Nothing -> Encode.null )
          , ( "todos", case rec.todos of
            Just list -> Encode.list (List.map todoEncoder list)
            Nothing -> Encode.null )
          ]
    in
      Encode.object list

todoEncoder: Todo -> Encode.Value
todoEncoder td =
    Encode.object [ ( "id", Encode.int td.id )
    , ( "number", Encode.int td.number )
    , ( "text", Encode.string td.text )
    , ( "image", encodeString td.image )
    , ( "image_comment", encodeString td.image_comment )
    ]

tagEncoder: Tag -> Encode.Value
tagEncoder tag =
    let
      list =
          [ ( "id", encodeInt tag.id )
          , ( "name", Encode.string tag.name )
          , ( "tagType", tagtypeEncoder tag.tagType )
          ]
    in
      Encode.object list

tagtypeEncoder: TagtypeShort -> Encode.Value
tagtypeEncoder tt =
    Encode.object [ ( "id", encodeInt tt.id )
    , ( "name", Encode.string tt.name )
    ]

ingreEncoder: Ingredient -> Encode.Value
ingreEncoder ingre =
    let
      list =
          [ ( "id", encodeInt ingre.id )
          , ( "name", Encode.string ingre.name )
          , ( "sortorder", Encode.int ingre.sortorder )
          , ( "comment", encodeString ingre.comment )
          , ( "part", encodeInt ingre.part )
          , ( "quantity", encodeFloat ingre.quantity )
          , ( "unit", case ingre.unit of
            Just val -> unitEncoder val
            Nothing -> Encode.null )
          ]
    in
      Encode.object list

unitEncoder: Unit -> Encode.Value
unitEncoder unit =
    Encode.object [ ( "id", Encode.int unit.id )
    , ( "name", Encode.string unit.name )
    , ( "unitCategory", unitCatEncoder unit.unitCategory )
    ]

unitCatEncoder: UnitCategory -> Encode.Value
unitCatEncoder uc =
    let
      list =
          [ ( "id", Encode.int uc.id )
          , ( "name", Encode.string uc.name )
          ]
    in
      Encode.object list

sourceEncoder : Source -> Encode.Value
sourceEncoder src =
    let
      list =
          [ ( "id", encodeInt src.id )
          , ( "name", Encode.string src.name )
          , ( "isbn", encodeString src.isbn )
          , ( "year", encodeString src.year )
          ]
    in
      Encode.object list

tagtypeShortDecoder : Decoder TagtypeShort
tagtypeShortDecoder = Decode.map2 TagtypeShort
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)

tagDecoder : Decoder Tag
tagDecoder = Decode.map3 Tag
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (field "tagType" tagtypeShortDecoder)

tagListDecoder : Decoder (List Tag)
tagListDecoder =
  Decode.list tagDecoder

tagtypeDecoder : Decoder Tagtype
tagtypeDecoder =
  Decode.map3 Tagtype
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "tagList" tagListDecoder)

ingrDecoder : Decoder Ingredient
ingrDecoder = Decode.map7 Ingredient
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (Decode.maybe <| field "comment" Decode.string)
  (Decode.maybe <| field "part" Decode.int)
  (Decode.maybe <| field "quantity" Decode.float)
  (field "sortorder" Decode.int)
  (Decode.maybe <| field "unit" unitDecoder)

ingrListDecoder : Decoder (List Ingredient)
ingrListDecoder =
  Decode.list ingrDecoder

unitDecoder : Decoder Unit
unitDecoder = Decode.map3 Unit
  (field "id" Decode.int)
  (field "name" Decode.string)
  (field "unitCategory" unitCategoryDecoder)

unitCategoryDecoder : Decoder UnitCategory
unitCategoryDecoder = Decode.map2 UnitCategory
  (field "id" Decode.int)
  (field "name" Decode.string)

sourceDecoder : Decoder Source
sourceDecoder = Decode.map4 Source
  (Decode.maybe <| field "id" Decode.int)
  (Decode.maybe <| field "isbn" Decode.string)
  (field "name" Decode.string)
  (Decode.maybe <| field "year" Decode.string)

todoDecoder : Decoder Todo
todoDecoder = Decode.map5 Todo
  (field "id" Decode.int)
  (Decode.maybe <| field "image" Decode.string)
  (Decode.maybe <| field "image_comment" Decode.string)
  (field "number" Decode.int)
  (field "text" Decode.string)

todoListDecoder : Decoder (List Todo)
todoListDecoder = Decode.list todoDecoder

recipeLightDecoder : Decoder RecipeLight
recipeLightDecoder = Decode.map2 RecipeLight
  (field "id" Decode.int)
  (field "name" Decode.string)


recipeDecoder : Decode.Decoder Recipe
recipeDecoder =
    Decode.succeed Recipe
    |: (Decode.field "aikz" Decode.int)
    |: Decode.maybe (Decode.field "id" Decode.int)
    |: Decode.maybe (Decode.field "image" Decode.string)
    |: Decode.maybe (Decode.field "ingredients" ingrListDecoder)
    |: (Decode.field "name" Decode.string)
    |: Decode.maybe (Decode.field "translate" Decode.string)
    |: Decode.maybe (Decode.field "number" Decode.int)
    |: Decode.maybe (Decode.field "number_comment" Decode.string)
    |: Decode.maybe (Decode.field "nv_carbohydrates" Decode.float)
    |: Decode.maybe (Decode.field "nv_energy" Decode.float)
    |: Decode.maybe (Decode.field "nv_fat" Decode.float)
    |: Decode.maybe (Decode.field "nv_protein" Decode.float)
    |: Decode.maybe (Decode.field "nv_size" Decode.int)
    |: Decode.maybe (Decode.field "source" sourceDecoder)
    |: Decode.maybe (Decode.field "source_page" Decode.int)
    |: Decode.maybe (Decode.field "tags" tagListDecoder)
    |: Decode.maybe (Decode.field "todos" todoListDecoder)
