import { useState } from "react"
import { getDetailsPokemonTypeAndUrl } from "../../services/pokemon.service";
import { Pokemon } from "../../interface/pokemons.info.interface";



interface SearchComponentProps {
    onSearchResults: (results: any[]) => void;
}

const SearchComponent = ({ onSearchResults }: SearchComponentProps) => {
    const [pokemonName, setPokemonName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleSearch = async (searchTerm: string) => {
      if (!searchTerm.trim()) return;
  
      setIsLoading(true);
      setError(null);
  
      try {
        const pokemon = await getDetailsPokemonTypeAndUrl(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        onSearchResults([pokemon]);
      } catch (err) {
        setError('No se pudo encontrar el Pokémon. Por favor, intenta de nuevo.');
        onSearchResults([]); 
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSearch(pokemonName);
    };
  
    return (
      <form onSubmit={handleSubmit} className="bg-light-brown py-10">
        <div className="flex gap-6 px-10">
          <input 
            type="text" 
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Nombre del Pokémon"
            className="py-2 px-4 rounded"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-dark-brown rounded py-2 px-4 font-bold text-white-brown disabled:opacity-50"
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 px-10">{error}</p>}
      </form>
    );
  };
  
  export default SearchComponent;