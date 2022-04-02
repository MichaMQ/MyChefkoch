module Pages.OverViewPage exposing(viewOverview)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Devs.Objects as O
import Devs.TypeObject as TO
--import Debug exposing (log)

--import Recipe as RecipeObj

import Pages.LoginView as LW
import Pages.EditorView as EW
import Pages.RecipeView as RW
import Pages.RecipeListView as RLW
import Pages.TagtypeView as TtW
import Pages.Utils as Utils

-- View
viewOverview: O.Model -> Html TO.Msg -> Html TO.Msg
viewOverview model alertMsg =
  let
    content = case model.selectedRecipe of
      Just rec -> RW.viewRecipe model.session rec model.sp
      Nothing -> case model.recipesOfSelectedTag of
        Just _ -> RLW.viewRecipesOfTag model
        Nothing -> TtW.viewInitialTagtypeList model
    editForm = case model.showEditForm of
      Just _ -> EW.viewEditForm model
      Nothing -> Html.text ""
    sourceForm = case model.newSource of
      Just _ -> EW.viewSourceForm model
      Nothing -> Html.text ""
    tagForm = case model.addTag of
      Just _ -> EW.viewAddTagForm model
      Nothing -> Html.text ""
    loginForm = case model.session of
      Just session -> if String.length session.account.token == 0
        then LW.getLoginForm model
        else Html.text ""
      Nothing -> Html.text ""
    confirmDeleteForm = if model.deleteRecipe
      then Utils.getConfirmForm TO.DeleteRecipe TO.CancelDelete "Soll das Rezept wirklich gelöscht werden?"
      else Html.text ""
    isLoggedIn = case model.session of
      Just session -> String.length session.account.token > 0
      Nothing -> False
    actionButton = if isLoggedIn == True
      then Html.button [ onClick TO.InsertRecipe ][ Html.text "hinzufügen" ]
      else Html.button [ class "loginBtn", onClick TO.GetLoginForm ][ Html.text "einloggen" ]
    printBookLink = model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/printBookDownload"
  in
    Html.div[][
      sourceForm, tagForm, editForm, loginForm, confirmDeleteForm,
      Html.h1 [class "noprint"][ Html.text "Meine Rezeptesammlung" ],
      Html.div [ id "searchDiv", class "noprint"][
        Html.div [ id "searchForm" ][
          Html.input [
            type_ "text",
            name "searchField",
            class "searchField",
            placeholder "Welches Rezept suchst du?",
            value model.searchValue,
            onInput TO.SetSearchInput,
            Utils.onEnter TO.SearchRecipe
          ][],
          Html.button [
            name "searchButton",
            value "search",
            onClick TO.SearchRecipe
          ][ Html.text "suche" ],
          actionButton,
          Html.a [ href printBookLink ] [ Html.text "Buch drucken" ]
--          Html.button [ onClick PrintBook ][ Html.text "Buch drucken" ]
        ]
      ], alertMsg,
      content
    ]
