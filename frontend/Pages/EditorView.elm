module Pages.EditorView exposing(viewEditForm, viewSourceForm, viewAddTagForm)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Events.Extra as EvE exposing (onChange)
import List exposing (..)
import Json.Decode as Json

import Devs.Objects as O exposing (..)
import Devs.TypeObject as TO exposing (Msg)
import Pages.Utils as PU exposing (alert, onEnter)
import Pages.EditorTabs.Tab1 as Tab1 exposing (showTab)
import Pages.EditorTabs.Tab2 as Tab2 exposing (showTab,showTagOption)
import Pages.EditorTabs.Tab3 as Tab3 exposing (showTab)
import Pages.EditorTabs.Tab4 as Tab4 exposing (showTab)
import Pages.EditorTabs.Tab5 as Tab5 exposing (showTab)
-- View

--type alias Source = {id: Maybe Int, isbn: Maybe String, name: String, year: Maybe String}

viewAddTagForm: Model -> Html Msg
viewAddTagForm model =
  let
    initialTagList = case model.kl.tagList of
      Just tags -> tags
      Nothing -> []
  in
    Html.div [ class "srcFormBG" ][
      Html.div [ class "srcFormDiv" ] [
        Html.div[ class "srcFormDivRow"][
          Html.div[][
            Html.select [ EvE.onChange TO.SetChoosenTag ] (List.append [PU.getSelectOption](List.map (Tab2.showTagOption O.getEmptyTag) (sortBy .name initialTagList)))
          ]
        ], PU.alert TO.CloseLoginAlert model.subAlertMessage model,
        Html.div [ class "editFormActionDiv" ][
          Html.button [ onClick TO.AddTagToRecipe ][ Html.text "zuordnen" ],
          Html.button [ onClick TO.CancelAddTag ][ Html.text "abbrechen" ]
        ]
      ]
    ]


viewSourceForm: Model -> Html Msg
viewSourceForm model =
  let
    newSrc = case model.newSource of
      Just src -> src
      Nothing -> O.getEmptySource
    {-}
    idValue = case newSrc.id of
      Just val -> String.fromInt val
      Nothing -> ""
    -}
    isbnValue = case newSrc.isbn of
      Just val -> val
      Nothing -> ""
    yearValue = case newSrc.year of
      Just val -> val
      Nothing -> ""
  in
    Html.div [ class "srcFormBG" ][
      Html.div [ class "srcFormDiv" ] [
        Html.div[ class "srcFormDivRow"][
          {-
          Html.div[][
            Html.label [ for "id" ][ Html.text "ID" ],
            Html.input [ type_ "text", id "id", value idValue, disabled True ][]
          ],
          -}
          Html.div[][
            Html.label [ for "name" ][ Html.text "Name *" ],
            Html.input [ type_ "text", onInput TO.SetSrcName, id "name", value newSrc.name ][]
          ],
          Html.div[][
            Html.label [ for "isbn" ][ Html.text "ISBN" ],
            Html.input [ type_ "text", onInput TO.SetSrcIsbn, id "isbn", value isbnValue ][]
          ],
          Html.div[][
            Html.label [ for "year" ][ Html.text "Jahr" ],
            Html.input [ type_ "text", onInput TO.SetSrcYear, id "year", value yearValue ][]
          ]
        ], PU.alert TO.CloseLoginAlert model.subAlertMessage model,
        Html.div [ class "editFormActionDiv" ][
          Html.button [ onClick TO.SaveNewSource ][ Html.text "speichern" ],
          Html.button [ onClick TO.CancelSourceEdit ][ Html.text "abbrechen" ]
        ]
      ]
    ]

viewEditForm: Model -> Html Msg
viewEditForm model =
  let
    recipeForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> O.getEmptyRecipe
    editForm = case model.showEditForm of
      Just ef -> ef
      Nothing -> O.None
  in
    Html.div [ class "editFormBG" ][
      Html.div [ class "editFormDiv" ] [
        case editForm of
          BasicForm -> Tab1.showTab model
          TagForm -> Tab2.showTab model
          IngredientForm -> Tab3.showTab model
          TodoForm -> Tab4.showTab model
          FootValueForm -> Tab5.showTab model
          None -> Html.text ""
        , Html.div [ class "editFormActionDiv" ][
          Html.button [ onClick (TO.ToggleEditForm O.None) ][ Html.text "schließen" ]
        ]
      ]
    ]
