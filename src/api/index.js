const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchAllbooks() {
    try {
      const response = await fetch(`${baseUrl}/books`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  