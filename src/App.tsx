import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import "./App.css";
import AppForm, { type Habit } from "./components/AppForm";
import AppButton from "./components/AppButton";
import { useEffect, useState } from "react";
import HabitCard from "./components/HabitCard";
import AppInput from "./components/AppInput";

// localStorage keys
const LOCAL_STORAGE_KEY = "myHabitTracker";
const LOCAL_STORAGE_PROGRESS_KEY = "myProgress";

// Check if habits exist on localStorage
const localStorageHabits = (): Habit[] => {
	try {
		const storedHabits = localStorage.getItem(LOCAL_STORAGE_KEY);
		return storedHabits ? JSON.parse(storedHabits) : [];
	} catch (error) {
		console.error("Failed to get habits from localStorage", error);
		return [];
	}
};

// App
function App() {
	// States
	const [habits, setHabits] = useState<Habit[]>(localStorageHabits);
	const [search, setSearch] = useState<string>("");

	// Progress
	const getProgress = (): Record<string, boolean[]> => {
		try {
			const storedProgress = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);
			return storedProgress ? JSON.parse(storedProgress) : {};
		} catch (error) {
			console.error("Failed to load progress", error);
			return {};
		}
	};

	// Progress state
	const [progress, setProgress] =
		useState<Record<string, boolean[]>>(getProgress);

	// Persist habits
	useEffect(() => {
		try {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits));
		} catch (error) {
			console.error("Failed to save habits.", error);
		}
	}, [habits]);

	// Persist progress
	useEffect(() => {
		try {
			localStorage.setItem(
				LOCAL_STORAGE_PROGRESS_KEY,
				JSON.stringify(progress),
			);
		} catch (error) {
			console.error("Failed to save progress", error);
		}
	}, [progress]);

	// Handlers
	const handleAddHabit = (newHabit: Habit) => {
		setHabits((prevHabits) => [...prevHabits, newHabit]);
	};

	// Update progress
	const handleProgressChange = (habitId: string, newProgress: boolean[]) => {
		setProgress((prev) => ({ ...prev, [habitId]: newProgress }));
	};

	// Reset progress
	const handleResetCompleted = () => {
		const resetProgress: Record<string, boolean[]> = {};

		habits.forEach((habit) => {
			resetProgress[habit.id] = new Array(7).fill(false);
		});
		setProgress(resetProgress);

		try {
			localStorage.removeItem(LOCAL_STORAGE_PROGRESS_KEY);
		} catch (error) {
			console.error("Failed to reset progress from localStorage", error);
		}
	};

	// Handle modal edit-delete
	const handleEditHabit = (
		habitId: string,
		newName: string,
		newColor: string,
	) => {
		const newValues = habits.map((habit) => {
			if (habit.id === habitId) {
				return {
					...habit,
					name: newName,
					color: newColor,
				};
			}
			return habit;
		});
		setHabits(newValues);
	};

	const handleDeleteHabit = (habitId: string) => {
		const removeHabit = habits.filter((habit) => habit.id !== habitId);
		setHabits(removeHabit);
	};

	// Search
	const filterHabits = habits.filter((habit) =>
		habit.name.toLowerCase().includes(search.toLowerCase()),
	);

	// TODO: useEffect to manage filter properlys

	return (
		<main>
			<Container
				maxW="container.lg"
				py={7}
				boxShadow="dark-lg"
				borderRadius="2xl"
			>
				<VStack
					align="stretch"
					boxShadow="lg"
				>
					<Heading
						as="h1"
						size="xl"
						mb={4}
						textAlign="start"
						textColor="#9E905F"
						textShadow="1px 1px rgb(83, 82, 82)"
					>
						HabitTracker
					</Heading>

					<Box
						marginBottom={5}
						borderBottom="2px"
						borderColor="gray.200"
						paddingBottom={3}
					>
						<AppForm onAddHabit={handleAddHabit} />
					</Box>

					{/*Search Habits*/}
					{habits.length > 0 && (
						<VStack
							align="stretch"
							mb={4}
							spacing={4}
						>
							<AppInput
								type="text"
								id="habit-search"
								value={search}
								placeholder="Search your habits by name"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</VStack>
					)}

					{/* Render habits */}
					{filterHabits.length > 0 && (
						<Box>
							<Heading
								as="h2"
								size="md"
								mb={4}
								textAlign="start"
								textColor="#9E905F"
								textShadow="1px 1px rgb(83, 82, 82)"
							>
								New Habits
							</Heading>

							<VStack
								spacing={3}
								align="stretch"
								mb={2}
							>
								{filterHabits.map((habit) => (
									<HabitCard
										key={habit.id}
										habitName={habit.name}
										color={habit.color}
										habitId={habit.id}
										progress={progress[habit.id]}
										onProgressChange={(newProgress) =>
											handleProgressChange(habit.id, newProgress)
										}
										onEdit={handleEditHabit}
										onDelete={handleDeleteHabit}
									/>
								))}
							</VStack>
						</Box>
					)}
				</VStack>

				<AppButton
					onClick={handleResetCompleted}
					type="button"
				>
					Reset tracking
				</AppButton>
			</Container>
		</main>
	);
}

export default App;
