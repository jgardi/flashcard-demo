import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import Context from '../context'
import AddFlashcard from './AddFlashcard'
import Flashcard from './Flashcard'
import Search from './Search'
import Categories from './Categories'

import { GET_FLASHCARDS } from '../gql/queries'

const FlashCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  flex-direction: flex-start;
`

const Container = styled.header`
  padding: 1rem;
  display: flex;
  @media (max-width: 798px) {
    display: block;
  }
`

const Content = styled.div`
  width: 80%;
  @media (max-width: 798px) {
    width: 100%;
  }
`

const SideNav = styled.div`
  width: 20%;
  @media (max-width: 798px) {
    width: 100%;
  }
`

const Flashcards = () => {
  const [search, setSearch] = useState()

  const { state, dispatch } = useContext(Context)
  const { data, loading, error } = useQuery(GET_FLASHCARDS)

  useEffect(() => {
    if (data && data.flashcards) {
      dispatch({
        type: 'ADD_FLASHCARD',
        payload: data.flashcards,
      })
    }
  }, [data])

  if (loading) return <div>Loading ...</div>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <Container>
      <SideNav>
        <Categories />
      </SideNav>
      <Content>
        <AddFlashcard />
        <Search
          searchTerm={search}
          placeholder={'enter flashcard id'}
          setSearch={setSearch}
        />

        {search && <h4>Search Results</h4>}
        {state && state.flashcards.length <= 0 && (
          <div>There are no existing flashcards</div>
        )}

        <FlashCardsContainer>
          {state &&
            state.flashcards &&
            state.flashcards.map(row => (
              <Flashcard key={row._id} flashcard={row} />
            ))}
        </FlashCardsContainer>
      </Content>
    </Container>
  )
}

export default Flashcards
