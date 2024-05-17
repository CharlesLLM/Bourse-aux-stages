<?php

namespace App\Entity;

use App\Entity\Traits\LocatableTrait;
use App\Repository\StudentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: StudentRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Student
{
    use LocatableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?Uuid $id = null;

    #[ORM\OneToOne(inversedBy: 'student', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Experience::class, orphanRemoval: true)]
    private Collection $experiences;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Skill::class, orphanRemoval: true)]
    private Collection $skills;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Hobby::class, orphanRemoval: true)]
    private Collection $hobbies;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Formation::class, orphanRemoval: true)]
    private Collection $formations;

    public function __construct()
    {
        $this->experiences = new ArrayCollection();
        $this->skills = new ArrayCollection();
        $this->hobbies = new ArrayCollection();
        $this->formations = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->setStudent($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            if ($experience->getStudent() === $this) {
                $experience->setStudent(null);
            }
        }

        return $this;
    }

    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(Skill $skill): static
    {
        if (!$this->skills->contains($skill)) {
            $this->skills->add($skill);
            $skill->setStudent($this);
        }

        return $this;
    }

    public function removeSkill(Skill $skill): static
    {
        if ($this->skills->removeElement($skill)) {
            if ($skill->getStudent() === $this) {
                $skill->setStudent(null);
            }
        }

        return $this;
    }

    public function getHobbies(): Collection
    {
        return $this->hobbies;
    }

    public function addHobby(Hobby $hobby): static
    {
        if (!$this->hobbies->contains($hobby)) {
            $this->hobbies->add($hobby);
            $hobby->setStudent($this);
        }

        return $this;
    }

    public function removeHobby(Hobby $hobby): static
    {
        if ($this->hobbies->removeElement($hobby)) {
            if ($hobby->getStudent() === $this) {
                $hobby->setStudent(null);
            }
        }

        return $this;
    }

    public function getFormations(): Collection
    {
        return $this->formations;
    }

    public function addFormation(Formation $formation): static
    {
        if (!$this->formations->contains($formation)) {
            $this->formations->add($formation);
            $formation->setStudent($this);
        }

        return $this;
    }

    public function removeFormation(Formation $formation): static
    {
        if ($this->formations->removeElement($formation)) {
            if ($formation->getStudent() === $this) {
                $formation->setStudent(null);
            }
        }

        return $this;
    }
}
